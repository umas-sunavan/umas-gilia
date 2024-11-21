// ----------------------------------------------------------------------

import { TrainMessage } from './train';

export type ITrainLabel = {
  id: string;
  icon: string;
  type: string;
  name: string;
  color: string;
  unreadCount?: number;
};

export type ITrainRes = {
  id: string;
  type: string;
  name: string;
  color: string;
  unreadCount?: number;
};

export type ITrainSender = {
  name: string;
  email: string;
  avatarUrl: string | null;
};

export type ITrainAttachment = {
  id: string;
  name: string;
  size: number;
  type: string;
  path: string;
  preview: string;
  createdAt: Date;
  modifiedAt: Date;
};

export type ITrain = {
  id: string;
  labelIds: string[];
  folder: string;
  isImportant: boolean;
  isStarred: boolean;
  isUnread: boolean;
  subject: string;
  message: string;
  createdAt: Date;
  attachments: ITrainAttachment[];
  from: ITrainSender;
  to: ITrainSender[];
};

export type ITrains = {
  byId: Record<string, TrainMessage>;
  allIds: string[];
};
