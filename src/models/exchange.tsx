 export enum Currencies {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
}

export enum Cryptos {
  BTC = 'BTC',
  LTC = 'LTC',
  ETH = 'ETH',
}

export enum PaymentMethod {
  BANK = 'bank',
  CREDIT = 'credit',
  DEBIT = 'debit',
}

type CryptoRates = {
  [key in Currencies]: string;
};

export type ExchangeRates = {
  [key in Cryptos]: CryptoRates;
};