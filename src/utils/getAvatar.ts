import { _mock } from 'src/_mock';

export default (chatterId: string) => _mock.image.avatar((chatterId.charCodeAt(0) || 0) % 10);
