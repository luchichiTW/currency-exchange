import { Currency } from './currency.enum';

export const CURRENCIES = Symbol('CURRENCIES');

export type Currencies = {
  [key in Currency]: {
    [key in Currency]: number;
  };
};
