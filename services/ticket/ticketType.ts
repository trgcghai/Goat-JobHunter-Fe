import { IBackendRes } from '@/types/api';
import { ReportReason } from '@/types/enum';

export type CreateTicketRequest = {
  blogId?: number;
  commentId?: number;
  reason: ReportReason;
  description: string;
};

export type TicketMutationResponse = IBackendRes<any>;
