import { join } from 'path';
import server from './server';

export default api => {
  api.addUIPlugin(join(__dirname, './ui/dist/index.umd'));
  server(api);
};
