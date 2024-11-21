import { useEmployee } from 'src/hooks/use-employee';

import { Message } from 'src/types/message';

// ----------------------------------------------------------------------

type Props = {
  message: Message;
};

export default function useGetMessage({ message }: Props) {
  const { employee } = useEmployee();

  const me = message.chatter_id === employee.id;

  const hasImage = message.type === 'image';

  return {
    hasImage,
    me,
  };
}
