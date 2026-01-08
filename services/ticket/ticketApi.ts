import { api } from '../api';
import { CreateTicketRequest, TicketMutationResponse } from './ticketType';

export const ticketApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    createBlogTicket: builder.mutation<TicketMutationResponse, CreateTicketRequest>({
      query: (data) => ({
        url: '/ticket/blog',
        method: 'POST',
        data,
      }),
    }),
    createCommentTicket: builder.mutation<TicketMutationResponse, CreateTicketRequest>({
      query: (data) => ({
        url: '/ticket/comment',
        method: 'POST',
        data,
      }),
    }),
  }),
});

export const { useCreateBlogTicketMutation, useCreateCommentTicketMutation } = ticketApi;
