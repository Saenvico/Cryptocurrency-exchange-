import { Currencies, Cryptos, PaymentMethod } from '@/models/exchange';

export const CURRENCIES = [
  {
    title: 'EUR',
    value: Currencies.EUR,
    icon: '€',
  },
  {
    title: 'USD',
    value: Currencies.USD,
    icon: '$',
  },
  {
    title: 'GBP',
    value: Currencies.GBP,
    icon: '£',
  },
];

export const CRYPTOS = [
  {
    title: 'BTC',
    value: Cryptos.BTC,
    label: 'BITCOIN',
    src: '/btc.webp',
    alt: 'Bitcoin Logo',
  },
  {
    title: 'LTC',
    value: Cryptos.LTC,
    label: 'LITECOIN',
    src: '/ltc.png',
    alt: 'Litecoin Logo',
  },
  {
    title: 'ETH',
    value: Cryptos.ETH,
    label: 'ETHEREUM',
    src: '/eth.png',
    alt: 'Ethereum Logo',
  },
];

export const PAYMENTMETHODS = [
  {
    value: PaymentMethod.BANK,
    title: 'Easy bank transfer',
  },
  {
    value: PaymentMethod.CREDIT,
    title: 'Credit card',
  },
  {
    value: PaymentMethod.DEBIT,
    title: 'Debit card',
  },
];
