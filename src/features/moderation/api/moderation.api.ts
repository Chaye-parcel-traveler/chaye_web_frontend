import { apiRequest } from '../../../shared/api/request';

export type ReportTargetType = 'member' | 'announcement' | 'registration';

export type ReportPayload = {
  targetType: ReportTargetType;
  targetId?: string | number;
  reason: string;
  description?: string;
  reporterEmail?: string;
};

export type ModerationReportStatus =
  | 'open'
  | 'dismissed'
  | 'warned'
  | 'suspended';

export type ModerationReport = {
  id: number;
  targetType: ReportTargetType;
  targetId?: string | number;
  targetLabel: string;
  reason: string;
  description?: string;
  reporterEmail?: string;
  status: ModerationReportStatus;
  createdAt: string;
};

export type ModerationAction = 'dismiss' | 'warn' | 'suspend';

export const createReport = (payload: ReportPayload) =>
  apiRequest('/reports', {
    method: 'POST',
    body: payload,
  });

export const getModerationReports = () =>
  apiRequest<ModerationReport[]>('/moderation/reports', {
    method: 'GET',
  });

export const dismissModerationReport = (reportId: number) =>
  apiRequest(`/moderation/reports/${reportId}/dismiss`, {
    method: 'PATCH',
  });

export const warnModerationTarget = (reportId: number) =>
  apiRequest(`/moderation/reports/${reportId}/warn`, {
    method: 'POST',
  });

export const suspendModerationTarget = (reportId: number) =>
  apiRequest(`/moderation/reports/${reportId}/suspend`, {
    method: 'POST',
  });
