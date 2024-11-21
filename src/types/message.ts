import { Correction } from './correction';

export type Message = {
  id: string;
  chatter_id: string;
  create_at: number;
  text: string;
  type: 'image' | 'text';
  correction: Correction[];
};
