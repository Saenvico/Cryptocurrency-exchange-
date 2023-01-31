import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import {
  Container,
  Grid,
  Select,
  MenuItem,
  SelectChangeEvent,
  Button,
} from '@mui/material';
import EuroIcon from '@mui/icons-material/Euro';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CurrencyPoundIcon from '@mui/icons-material/CurrencyPound';
import Image from 'next/image';
import styles from '@/styles/BuyAndSell.module.css';
import Header from '@/components/Header';
import Location from '@/components/Location';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(`https://api.coingate.com/v2/rates/`);
  const data = await res.json();
  return {
    props: {
      data,
      exchangeRates: data.merchant || null,
    },
  };
};

enum Currencies {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
}

enum Cryptos {
  BTC = 'BTC',
  LTC = 'LTC',
  ETH = 'ETH',
}

interface ExchangeProps {
  exchangeRates: {
    BTC: {
      USD: string;
      EUR: string;
      GBP: string;
    };
    LTC: {
      USD: string;
      EUR: string;
      GBP: string;
    };
    ETH: {
      USD: string;
      EUR: string;
      GBP: string;
    };
  };
}

const CURRENCIES = [
  {
    title: 'EUR',
    value: Currencies.EUR,
  },
  {
    title: 'USD',
    value: Currencies.USD,
  },
  {
    title: 'GBP',
    value: Currencies.GBP,
  },
];

const CRYPTOS = [
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

const PAYMENTMETHODS = [
  {
    value: 'bank',
    title: 'Easy bank transfer',
  },
  {
    value: 'credit',
    title: 'Credit card',
  },
  {
    value: 'debit',
    title: 'Debit card',
  },
];

export default function BuyAndSell({ exchangeRates }: ExchangeProps) {
  const [currency, setCurrency] = useState<Currencies>(Currencies.EUR);
  const [crypto, setCrypto] = useState<Cryptos>(Cryptos.BTC);
  const [payment, setPayment] = useState('bank');
  const [currencyInputValue, setCurrencyInputValue] = useState<number>();
  const [cryptoValue, setCryptoValue] = useState<number>();
  const [showMinAmount, setShowMinAmount] = useState<boolean>(false);

  const handleCurrencyChange = (event: SelectChangeEvent) => {
    setCurrency(event.target.value as Currencies);
  };

  const handleCryptoChange = (event: SelectChangeEvent) => {
    setCrypto(event.target.value as Cryptos);
  };

  const handlePaymentChange = (event: SelectChangeEvent) => {
    setPayment(event.target.value as string);
  };

  const countingHandler = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    let currencyValue = Number.parseInt(target.value);

    if (!currencyValue || currencyValue === 0) {
      setCryptoValue(0);
      setCurrencyInputValue(0);
      return;
    }

    setCurrencyInputValue(currencyValue);
  };

  useEffect(() => {
    if (!currencyInputValue || currencyInputValue === 0) {
      return;
    }
    const getCurrencyValue = parseFloat(exchangeRates[crypto][currency]);
    const receiveAmountToFixed = (
      currencyInputValue / getCurrencyValue
    ).toFixed(10) as any;
    const receiveAmount: number = parseFloat(receiveAmountToFixed);

    if (receiveAmount < 0.000048) {
      setShowMinAmount(true);
    } else {
      setShowMinAmount(false);
    }

    setCryptoValue(receiveAmount);
  }, [exchangeRates, currency, crypto, currencyInputValue]);

  const handleSubmit = () => {
    if (currencyInputValue) {
      console.log(currencyInputValue, currency, cryptoValue, crypto, payment);
      alert(`Success! You bought ${cryptoValue} ${crypto}`);
    } else {
      alert(`Please enter valid amount in pay amount field`);
    }
  };

  return (
    <>
      <main className={styles.main}>
        <Header />
        <Location />
        <div
          className={`${styles.containerAligment} ${styles.containerExchangeAligment}`}
        >
          <Container className={styles.container}>
            <label className={`${styles.label} ${styles.labelTop}`}>
              Pay amount
            </label>
            <Grid>
              <input
                type="number"
                className={`${styles.inputTop} ${styles.inputSelectBox}`}
                onChange={countingHandler}
                placeholder="Currency amount"
                required
              ></input>
              <Select
                className={`${styles.selectTop} ${styles.inputSelectBox}`}
                labelId="select-label"
                id="select"
                value={currency}
                label="Currency"
                onChange={handleCurrencyChange}
              >
                {CURRENCIES.map((item) => (
                  <MenuItem
                    key={item.title}
                    className={styles.menuItem}
                    value={item.value}
                  >
                    <EuroIcon className={styles.icon} />
                    <span className={styles.menuItemText}>{item.title}</span>
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <label className={`${styles.label} ${styles.labelBottom}`}>
              Receive amount
            </label>
            <Grid>
              <div
                className={`${styles.textBoxBottom} ${styles.inputSelectBox}`}
              >
                {cryptoValue}
              </div>
              <Select
                className={`${styles.selectBottom} ${styles.inputSelectBox}`}
                labelId="select-label"
                id="select"
                value={crypto}
                label="Currency"
                onChange={handleCryptoChange}
              >
                {CRYPTOS.map((item) => (
                  <MenuItem
                    key={item.title}
                    className={styles.menuItem}
                    value={item.value}
                  >
                    <Grid>
                      <Image
                        src={item.src}
                        alt={item.alt}
                        className={styles.icon}
                        width={20}
                        height={20}
                        priority
                      />
                      <span className={styles.cryptoShortName}>
                        {item.title}
                      </span>
                    </Grid>
                    <label className={styles.cryptoLabel}>{item.label}</label>
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Container>
          {showMinAmount && (
            <span className={styles.minAmount}>Min amount is 0.000048 BTC</span>
          )}
        </div>
        <div
          className={`${styles.containerAligment} ${styles.containerPaymentMethodAlignment}`}
        >
          <Container className={styles.container}>
            <label className={`${styles.label} ${styles.labelPaymentMethod}`}>
              Payment method
            </label>
            <Select
              className={`${styles.inputPaymentMehod} ${styles.inputSelectBox}`}
              labelId="select-label"
              id="select"
              value={payment}
              label="Currency"
              onChange={handlePaymentChange}
            >
              {PAYMENTMETHODS.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  <span className={styles.spanMenuItemPayment}>
                    {item.title}
                  </span>
                </MenuItem>
              ))}
            </Select>
          </Container>
        </div>
        <div
          className={`${styles.containerAligment} ${styles.containerPayConfirmationAligment}`}
        >
          <Container className={`${styles.container} ${styles.orderInfo}`}>
            <span>Order information</span>
          </Container>
          <Container className={styles.container}>
            <Grid>
              <span className={styles.totalAmount}>Total amount to Pay</span>
              <div>
                <div className={styles.price}>
                  {currencyInputValue}
                  {currency === 'EUR' ? (
                    <EuroIcon className={styles.icon} />
                  ) : currency === 'USD' ? (
                    <AttachMoneyIcon className={styles.icon} />
                  ) : (
                    <CurrencyPoundIcon className={styles.icon} />
                  )}
                </div>
              </div>
            </Grid>
            <Button onClick={() => handleSubmit()} className={styles.button}>
              Buy {crypto}
            </Button>
          </Container>
        </div>
      </main>
    </>
  );
}