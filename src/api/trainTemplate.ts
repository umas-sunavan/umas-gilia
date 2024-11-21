import useSWR from 'swr';
import { useMemo } from 'react';
import keyBy from 'lodash/keyBy';
import { AxiosRequestConfig } from 'axios';

import { ITrains, ITrainLabel } from 'src/types/trainLabels';

import { endpoints, trainsFetcher } from '../utils/axios';

// ----------------------------------------------------------------------

export function useGetTrainLabels() {
  const URL = endpoints.mail.labels;

  // const { data, isLoading, error, isValidating } = useSWR(URL, (args: string | [string, AxiosRequestConfig]) => {

  // return {labels}
  // });

  const memoizedValue = useMemo(() => {
    const labels: ITrainLabel[] = [
      {
        id: 'customer-complaint',
        icon: 'phone-incoming.svg',
        type: 'system',
        name: '客訴',
        unreadCount: 3,
        color: '#00AB55',
      },
      {
        id: 'business-hours',
        icon: 'clock.svg',
        type: 'system',
        name: '營業時間',
        unreadCount: 1,
        color: '#00AB55',
      },
      {
        id: 'payment-method',
        icon: 'credit-card.svg',
        type: 'system',
        name: '付款方式',
        unreadCount: 0,
        color: '#00AB55',
      },
      {
        id: 'quote',
        icon: 'dollar-sign.svg',
        type: 'system',
        name: '報價',
        unreadCount: 0,
        color: '#00AB55',
      },
      {
        id: 'budget',
        icon: 'save.svg',
        type: 'system',
        name: '預算',
        unreadCount: 0,
        color: '#00AB55',
      },
      {
        id: 'address',
        icon: 'map.svg',
        type: 'system',
        name: '地址',
        unreadCount: 1,
        color: '#00AB55',
      },
      {
        id: 'landmark',
        icon: 'map-pin.svg',
        type: 'system',
        name: '地標',
        unreadCount: 1,
        color: '#00AB55',
      },
      {
        id: 'telephone-number',
        icon: 'phone-call.svg',
        type: 'system',
        name: '電話號碼',
        unreadCount: 1,
        color: '#00AB55',
      },
      {
        id: 'wifi',
        icon: 'wifi.svg',
        type: 'custom',
        name: 'wifi',
        unreadCount: 0,
        color: '#00AB55',
      },
      {
        id: 'socket',
        icon: 'plug.svg',
        type: 'custom',
        name: '插座',
        unreadCount: 2,
        color: '#FFC107',
      },
      {
        id: 'parking-space',
        icon: 'parking.svg',
        type: 'custom',
        name: '停車位',
        unreadCount: 2,
        color: '#FFC107',
      },
      {
        id: 'no-smoking-smoking',
        icon: 'ciggaette.svg',
        type: 'custom',
        name: '禁煙/吸菸',
        unreadCount: 2,
        color: '#FFC107',
      },
      {
        id: 'child-seat',
        icon: 'disable.svg',
        type: 'custom',
        name: '兒童座椅',
        unreadCount: 2,
        color: '#FFC107',
      },
      {
        id: 'recommended-menu',
        icon: 'bookmark.svg',
        type: 'custom',
        name: '推薦選單',
        unreadCount: 2,
        color: '#FFC107',
      },
      {
        id: 'reservation-or-booking',
        icon: 'feather.svg',
        type: 'custom',
        name: '預約',
        unreadCount: 1,
        color: '#FF4842',
      },
    ];
    return {
      labels,
      labelsLoading: false,
      labelsError: '',
      labelsValidating: false,
      labelsEmpty: !!labels.length,
    };
  }, []);

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetTrains(labelId: string) {
  const URL = endpoints.train.get;

  const config: AxiosRequestConfig = {
    params: { user_id: '3dbab169-6d28-4d39-a17c-2b0839a30cb8' },
  };

  const { data, isLoading, error, isValidating } = useSWR(URL, trainsFetcher);

  const memoizedValue = useMemo(() => {
    const byId = keyBy(data, 'id') || {};
    const allIds = Object.keys(byId) || [];
    return {
      trains: {
        byId,
        allIds,
      } as ITrains,
      mailsLoading: false,
      mailsError: '',
      mailsValidating: false,
      mailsEmpty: !allIds.length,
    };
  }, [data]);

  return memoizedValue;
}

// ----------------------------------------------------------------------

// export function useGetTrain(mailId: string) {
// const URL = mailId ? [endpoints.mail.details, { params: { mailId } }] : '';

// const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

// const memoizedValue = useMemo(
//   () => ({
//     mail: data?.mail as IMail,
//     mailLoading: isLoading,
//     mailError: error,
//     mailValidating: isValidating,
//   }),
//   [data?.mail, error, isLoading, isValidating]
// );

// return memoizedValue;
// }
