export type Comment = {
  id?: number | string;
  memberId?: number | string;
  announcementId?: number | string;
  ratingStars?: number;
  content?: string;
  creationDate?: string;
};
