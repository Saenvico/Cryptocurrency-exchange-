import Head from 'next/head';
import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';
import Button from '@mui/material/Button';

export default function Home() {
  return (
    <>
      <Head>
        <title>Crypto exchange</title>
        <meta
          name="description"
          content="Change crypto by best rates in the market"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Button className={styles.button} href="/Account/Trader/Buy&Sell">
          Press to jump to Buy & Sell page
        </Button>
      </main>
    </>
  );
}
