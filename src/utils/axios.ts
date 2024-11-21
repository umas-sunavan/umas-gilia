import axios, { AxiosRequestConfig } from 'axios';

import _trains from 'src/_mock/_trains';
import { HOST_API } from 'src/config-global';
import _chatroomMessages from 'src/_mock/_chatroom-messages';

import { TrainMessage } from 'src/types/train';
import { ChatroomMessage } from 'src/types/chatroom';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

export const chatsFetcher = async (
  args: string | [string, AxiosRequestConfig]
): Promise<ChatroomMessage[]> => _chatroomMessages;

export const trainsFetcher = async (
  args: string | [string, AxiosRequestConfig]
): Promise<TrainMessage[]> => _trains;

export const chatFetcher = async (
  args: string | [string, AxiosRequestConfig]
): Promise<ChatroomMessage[]> => _chatroomMessages;

// ----------------------------------------------------------------------

export const endpoints = {
  chat: '/api/chat',
  kanban: '/api/kanban',
  calendar: '/api/calendar',
  train: {
    get: '/api/textmessage',
    set: '/api/textmessage',
  },
  auth: {
    me: '/api/auth/me',
    login: '/api/auth/login',
    register: '/api/auth/register',
  },
  mail: {
    list: '/api/mail/list',
    details: '/api/mail/details',
    labels: '/api/mail/labels',
  },
  post: {
    list: '/api/post/list',
    details: '/api/post/details',
    latest: '/api/post/latest',
    search: '/api/post/search',
  },
  product: {
    list: '/api/product/list',
    details: '/api/product/details',
    search: '/api/product/search',
  },
};
