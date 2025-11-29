import { api } from "@/services/api";
import { SendInvitationEmailRequest } from "@/services/email/emailType";

export  const emailApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    sendInvitationEmail: builder.mutation<void, SendInvitationEmailRequest>({
      query: (data) => ({
        url: "/email/jobs",
        method: "POST",
        data
      })
    })
  })
})

export const {
  useSendInvitationEmailMutation
} = emailApi;