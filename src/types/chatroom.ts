import { Chatter } from './chatter';
import { Message } from './message';

export type ChatroomMessage = {
  chatroom_id: string;
  chatroom_name: string;
  chatroom_simulation: boolean;
  user_id: string;
  messages: Message[];
  chatters: Chatter[];
};
