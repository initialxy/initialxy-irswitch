// @flow
'use strict';

export type ResponseStatusType = 'success' | 'error';

export type ResponseErrorType = 'network_error' | 'server_error';

export type GenericResponse = {
  'errorMessage': ?string,
  'errorType': ?ResponseErrorType,
  'status': ResponseStatusType,
}

export type AxiosResponse = {
  'status': number,
  'data': Object,
}

export type AxiosException = {
  'message': string,
  'response': ?{
    'data': Object,
    'status': number,
  },
}