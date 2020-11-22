import _ from 'lodash';

// Error Handler Helpers
export const fail = (message: string) => {
  throw new Error(message);
};

export const note = (message: string) => {
  console.log(['[NOTE: ', message, ']'].join(' '));
};

export const warn = (message: string) => {
  console.log(['[WARNING: ', message, ']'].join(' '));
};

export const existy = (a: any) => {
  return !_.isUndefined(a) && !_.isNull(a);
};
