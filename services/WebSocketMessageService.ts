import { Client } from '@stomp/stompjs';
import { ThunkDispatch } from 'redux-thunk';
import { UnknownAction } from 'redux';
import SockJS from 'sockjs-client';
import { store } from '@/lib/store';
import { chatRoomApi } from '@/services/chatRoom/chatRoomApi';
import { MessageType } from '@/types/model';

export class WebSocketMessageService {
  private client: Client | null = null;
  private subscribedChatRooms: Set<number> = new Set();
  private onConnectedCallback: (() => void) | null = null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(private readonly dispatch: ThunkDispatch<any, any, UnknownAction>, onConnected?: () => void) {
    this.onConnectedCallback = onConnected || null;
  }

  connect() {
    this.client = new Client({
      webSocketFactory: () => new SockJS(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5000/ws'),
      reconnectDelay: 5000,
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,
      debug: (str) => console.log('[STOMP Message]', str),
      beforeConnect: this.beforeConnect,
    });

    this.setupHandlers();
    this.client.activate();
  }

  disconnect() {
    if (this.client) {
      this.subscribedChatRooms.clear();
      this.client.deactivate();
      console.log('🔌 STOMP Message disconnected');
    }
  }

  subscribeToChatRoom(chatRoomId: number) {
    if (!this.client?.connected) {
      console.warn('⚠️ STOMP not connected, cannot subscribe to chat room', chatRoomId);
      return;
    }

    if (this.subscribedChatRooms.has(chatRoomId)) {
      console.log('ℹ️ Already subscribed to chat room', chatRoomId);
      return;
    }

    this.client.subscribe(`/topic/chatrooms/${chatRoomId}`, (frame) => {
      try {
        const message: MessageType = JSON.parse(frame.body);
        this.handleMessage(chatRoomId, message);
      } catch (err) {
        console.error('❌ Parse message error:', err);
      }
    });

    this.subscribedChatRooms.add(chatRoomId);
    console.log(`✅ Subscribed to /topic/chatrooms/${chatRoomId}`);
  }

  unsubscribeFromChatRoom(chatRoomId: number) {
    this.subscribedChatRooms.delete(chatRoomId);
    console.log(`🔕 Unsubscribed from chat room ${chatRoomId}`);
  }

  private readonly beforeConnect = () => {
    const { isAuthenticated, user } = store.getState().auth;
    return isAuthenticated && user ? Promise.resolve() : Promise.reject(new Error('User is not authenticated'));
  };

  private setupHandlers() {
    if (!this.client) return;

    this.client.onConnect = () => {
      console.log('✅ STOMP Message Connected');

      // Gọi callback để xử lý pending subscriptions
      this.onConnectedCallback?.();

      // Re-subscribe to previously subscribed chat rooms after reconnection
      this.subscribedChatRooms.forEach((chatRoomId) => {
        this.subscribeToChatRoom(chatRoomId);
      });
    };

    this.client.onStompError = (frame) => {
      console.error('❌ STOMP Message Error:', frame.headers['message']);
    };

    this.client.onWebSocketClose = () => {
      console.log('⚠️ WebSocket Message closed');
    };
  }

  private handleMessage(chatRoomId: number, message: MessageType) {
    console.log(`💬 Received message in chat room ${chatRoomId}:`, message);

    // Update cache for messages list
    this.dispatch(
      chatRoomApi.util.updateQueryData('fetchMessagesInChatRoom', {
        chatRoomId,
        page: 1,
        size: 50,
      }, (draft) => {
        if (draft?.data) {
          draft.data.push(message);
        }
      }),
    );

    // Update last message in chat rooms list
    this.dispatch(
      chatRoomApi.util.updateQueryData('fetchChatRooms', {}, (draft) => {

        if (draft?.data) {
          const chatRoom = draft.data?.result?.find((cr) => cr.roomId === chatRoomId);

          if (chatRoom) {
            chatRoom.lastMessagePreview = message.content;
            chatRoom.lastMessageTime = message.createdAt;

            // Move chat room to top
            if (draft?.data?.result) {
              draft.data.result = [
                chatRoom,
                ...draft?.data?.result?.filter((cr) => cr.roomId !== chatRoomId),
              ];
            }
          }
        }
      }),
    );
  }
}