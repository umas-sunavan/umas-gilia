import { Chatter } from './chatter';
import { TrainMessage } from './train';
import { ChatroomMessage } from './chatroom';

export type TrainChatterChat = { train: TrainMessage; chatter: Chatter; chat: ChatroomMessage };
export type TrainMapChatroom = { train: TrainMessage; chatroom: ChatroomMessage };
