// @flow
'use strict';

import {sendPing} from './Api';

const PING_INTERVAL_MS = 5000;

export function sleep(milliseconds: number): Promise<void> {
  return new Promise((resolve, _) => setTimeout(resolve, milliseconds));
}

export async function waitUntilAPIAlive(): Promise<void> {
  while (true) {
    await sleep(PING_INTERVAL_MS);
    const response = await sendPing();
    if (response.status === 'success') {
      break;
    }
  }
}
