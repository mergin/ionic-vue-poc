import { socialMediaHandlers } from './handlers/posts';
import { weatherHandlers } from './handlers/weather';

export const handlers = [...weatherHandlers, ...socialMediaHandlers];
