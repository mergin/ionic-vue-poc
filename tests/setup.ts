import { registerAppIcons } from '@/app/icon-registry';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { mswServer } from './msw-server';

registerAppIcons();

beforeAll(() => {
  mswServer.listen({ onUnhandledRequest: 'error' });
});

afterEach(() => {
  mswServer.resetHandlers();
});

afterAll(() => {
  mswServer.close();
});
