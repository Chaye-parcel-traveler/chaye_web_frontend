export type Message = {
  id?: number | string;
  memberId?: number | string;
  sender: string;
  recipient: string;
  message: string;
  datetime: string;
};
