export type TrainMessage = {
  id: number;
  text: string;
  user_id: string;
  message_id: string | null;
  category: string;
};
