// @flow
'use strict';

import axios from 'axios'
import type {
  AxiosException,
  AxiosResponse,
  GenericResponse,
  ResponseStatusType,
} from './types';

const client = axios.create({
  timeout: 30000,
});

function coerceResponse(rawResponse: AxiosResponse): GenericResponse {
  const isDataSuccess =
    rawResponse.data && rawResponse.data.status === 'success';
  const status = isDataSuccess ? 'success' : 'error';
  const errorType = !isDataSuccess ? 'server_error' : null;
  const errorMessage = (rawResponse.data.message: string);
  return {
    errorMessage,
    errorType,
    status,
  };
}

function coerceException(e: AxiosException): GenericResponse {
  return {
    errorMessage: e.message,
    errorType: e.response && e.response.status === 500
      ? 'server_error'
      : 'network_error',
    status: 'error',
  };
}

async function sendGet(path: string): Promise<GenericResponse> {
  try {
    const rawResponse = await client.get(path);
    return coerceResponse(rawResponse);
  } catch (e) {
    return coerceException(e);
  }
}

async function sendPost(
  path: string,
  data: Object = {},
): Promise<GenericResponse> {
  try {
    const rawResponse = await client.post(path, data);
    return coerceResponse(rawResponse);
  } catch (e) {
    return coerceException(e);
  }
}

export async function sendPing(): Promise<GenericResponse> {
  return await sendGet('/ping');
}

export async function sendOff(): Promise<GenericResponse> {
  return await sendPost('/off');
}

export async function sendOn(): Promise<GenericResponse> {
  return await sendPost('/on');
}

export async function sendReset(): Promise<GenericResponse> {
  return await sendPost('/reset');
}