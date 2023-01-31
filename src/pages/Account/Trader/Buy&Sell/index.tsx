import { useState, useRef, useEffect } from 'react';
import {
  Container,
  Grid,
  Input,
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

import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch(`https://api.coingate.com/v2/rates/`);
  const data = await res.json();
  return {
    props: {
      data,
      exchangeRates: data.merchant || null,
    },
    // revalidate: 3600,
  };
};
interface IObjectKeys {
  [key: string]: string;
}

interface IndexPageProps {
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

export default function BuyAndSell({ exchangeRates }: IndexPageProps) {
  console.log(exchangeRates.BTC.USD, 'data22');
  const [currency, setCurrency] = useState('EUR');
  const [crypto, setCrypto] = useState('BTC');
  const [payment, setPayment] = useState('bank');
  const [currencyInputValue, setCurrencyInputValue] = useState<Number>();
  const [cryptoValue, setCryptoValue] = useState<Number>();

  // const currencyTextInputRef = useRef<HTMLInputElement>(null);

  let minAmount: boolean = false;

  const handleCurrencyChange = (event: SelectChangeEvent) => {
    setCurrency(event.target.value as string);
  };

  const handleCryptoChange = (event: SelectChangeEvent) => {
    setCrypto(event.target.value as string);
  };

  const handlePaymentChange = (event: SelectChangeEvent) => {
    setPayment(event.target.value as string);
  };

  let receiveAmount = 0;
  let enteredCurrency = 0;

  const countingHandler = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    let currencyValue = Number.parseInt(target.value);

    setCurrencyInputValue(currencyValue);

    if (!currencyInputValue || currencyInputValue === 0) {
      console.log('check up');
      return;
    }

    const getCryptoValue = exchangeRates[crypto];
    const getCurrencyValue = parseInt(getCryptoValue[currency]);

    const receiveAmount: number = currencyInputValue / getCurrencyValue;
    setCryptoValue(receiveAmount);

    console.log(enteredCurrency, 'test');

    if (receiveAmount > 0.000048) {
      minAmount = true;
    }

    // const enteredCurrency = parseFloat(currencyTextInputRef.current!.value);
    console.log(currency, 'currency');

    // console.log(enteredCurrency, 'test');

    return enteredCurrency;
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
                value={currencyInputValue}
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
                <MenuItem className={styles.menuItem} value={'EUR'}>
                  <EuroIcon className={styles.icon} />
                  <span className={styles.menuItemText}>EUR</span>
                </MenuItem>
                <MenuItem className={styles.menuItem} value={'USD'}>
                  <AttachMoneyIcon className={styles.icon} />
                  <span className={styles.menuItemText}>USD</span>
                </MenuItem>
                <MenuItem className={styles.menuItem} value={'GBP'}>
                  <CurrencyPoundIcon className={styles.icon} />
                  <span className={styles.menuItemText}>GBP</span>
                </MenuItem>
              </Select>
            </Grid>

            <label className={`${styles.label} ${styles.labelBottom}`}>
              Receive amount
            </label>
            <Grid>
              <div className={`${styles.inputBottom} ${styles.inputSelectBox}`}>
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
                <MenuItem className={styles.menuItem} value={'BTC'}>
                  <Grid>
                    <Image
                      src="/btc.webp"
                      alt="Bitcoin Logo"
                      className={styles.icon}
                      width={20}
                      height={20}
                      priority
                    />
                    BTC
                  </Grid>
                  <label className={styles.cryptoLabel}>BITCOIN</label>
                </MenuItem>
                <MenuItem className={styles.icon} value={'LTC'}>
                  <Grid>
                    <Image
                      src="/ltc.png"
                      alt="Litecoin Logo"
                      className={styles.icon}
                      width={20}
                      height={20}
                      priority
                    />
                    LTC
                  </Grid>
                  <label className={styles.cryptoLabel}>LITECOIN</label>
                </MenuItem>
                <MenuItem className={styles.icon} value={'ETH'}>
                  <Grid>
                    <Image
                      src="/eth.png"
                      alt="Ethereum Logo"
                      className={styles.icon}
                      width={20}
                      height={20}
                      priority
                    />
                    ETH
                  </Grid>
                  <label className={styles.cryptoLabel}>ETHEREUM</label>
                </MenuItem>
              </Select>
            </Grid>
          </Container>
          {minAmount && (
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
              <MenuItem className={styles.menuItemPaymentMethod} value={'bank'}>
                Easy bank transfer
              </MenuItem>
              <MenuItem
                className={styles.menuItemPaymentMethod}
                value={'credit'}
              >
                Credit card
              </MenuItem>
              <MenuItem
                className={styles.menuItemPaymentMethod}
                value={'debit'}
              >
                Debit card
              </MenuItem>
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
            <Button className={styles.button}>Buy</Button>
          </Container>
        </div>
      </main>
    </>
  );
}
