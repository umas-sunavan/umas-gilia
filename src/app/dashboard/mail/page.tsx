import { TrainView, TrainInitView } from 'src/sections/mail/view';

export const metadata = {
  title: 'Dashboard: Mail',
};

export default function MailPage() {
  const inited = false;
  return inited ? <TrainView /> : <TrainInitView />;
}
