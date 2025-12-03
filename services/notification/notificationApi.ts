import { api } from "@/services/api";
import { buildSpringQuery } from "@/utils/buildSpringQuery";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { store } from "@/lib/store";
import { NotificationType } from "@/types/model";
import { toast } from "sonner";
import {
  LatestNotificationsResponse,
  MarkNotificationsAsSeenResponse,
  NotificationPaginationRequest,
  NotificationPaginationResponse
} from "@/services/notification/notificationType";

export const notificationApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getUsersNotifications: builder.query<
      NotificationPaginationResponse,
      NotificationPaginationRequest
    >({
      query: (params) => {
        const { params: queryParams } = buildSpringQuery({
          params,
          filterFields: [],
          textSearchFields: [],
          nestedArrayFields: {},
          defaultSort: "createdAt,desc"
        });

        return {
          url: "/users/me/notifications",
          method: "GET",
          params: queryParams
        };
      },
      providesTags: ["Notifications"]
    }),

    getLatestNotifications: builder.query<LatestNotificationsResponse, void>({
      query: () => ({
        url: "/users/me/notifications/latest",
        method: "GET"
      }),
      providesTags: ["Notifications"]
    }),

    markNotificationsAsSeen: builder.mutation<
      MarkNotificationsAsSeenResponse,
      number[]
    >({
      query: (data) => ({
        url: "/users/me/notifications",
        method: "PUT",
        data
      }),
      invalidatesTags: ["Notifications"]
    }),

    subscribeNotifications: builder.query<null, void>({
      queryFn: () => ({ data: null }),

      async onCacheEntryAdded(
        _,
        { cacheDataLoaded, cacheEntryRemoved, dispatch }
      ) {
        let client: Client | null = null;

        try {
          await cacheDataLoaded;

          client = new Client({
            webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
            reconnectDelay: 5000,
            heartbeatIncoming: 10000,
            heartbeatOutgoing: 10000,

            debug: (str) => console.log("[STOMP]", str),

            beforeConnect: () => {
              const { isAuthenticated, user } = store.getState().auth;
              if (isAuthenticated && user) {
                return Promise.resolve();
              }
              return Promise.reject();
            }
          });

          client.onConnect = () => {
            console.log("✅ STOMP Connected");

            // Subscribe theo đúng format backend: /user/queue/notifications
            client!.subscribe("/user/queue/notifications", (message) => {
              try {
                const notification: NotificationType = JSON.parse(message.body);
                console.log("🔔 Received notification:", notification);

                // Optimistically update cache
                dispatch(
                  notificationApi.util.updateQueryData("getLatestNotifications", undefined, (draft) => {
                    if (draft?.data) {
                      draft.data.unshift(notification);
                      draft.data = draft.data.slice(0, 10); // Giới hạn 10 items
                    }
                  })
                );

                // Show toast
                if (notification.type === "COMMENT") {
                  toast.success("Có ai đó đã bình luận về bài viết của bạn!");
                } else if (notification.type === "REPLY") {
                  toast.success("Có ai đó đã trả lời bình luận của bạn!");
                } else {
                  toast.info("Thông báo mới");
                }

              } catch (err) {
                console.error("❌ Parse notification error:", err);
              }
            });

            console.log("✅ Subscribed to /user/queue/notifications");
          };

          client.onStompError = (frame) => {
            console.error("❌ STOMP Error:", frame.headers["message"]);
            console.error("Error details:", frame.body);
          };

          client.onWebSocketClose = () => {
            console.log("⚠️ WebSocket closed");
          };

          client.activate();

        } catch (error) {
          console.error("❌ STOMP setup failed:", error);
        }

        await cacheEntryRemoved;
        if (client) {
          client.deactivate();
          console.log("🔌 STOMP disconnected");
        }
      }
    })
  })
});

export const {
  useGetUsersNotificationsQuery,
  useGetLatestNotificationsQuery,
  useMarkNotificationsAsSeenMutation,
  useSubscribeNotificationsQuery
} = notificationApi;