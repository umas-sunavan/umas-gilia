import _chatter from 'src/_mock/_chatter';
import { Chatter } from 'src/types/chatter';

export const getChatter = (id: string): Promise<Chatter> =>
  Promise.resolve(_chatter.find((chatter) => chatter.id === id) as Chatter);
