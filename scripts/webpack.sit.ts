import config from './webpack.pro';
import { resolve } from 'path';
(config.output as any).path = resolve('.', 'build/home');

export default { ...config };
