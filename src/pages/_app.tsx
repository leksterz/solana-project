import { AppProps } from 'next/app';
import Head from 'next/head';
import { FC } from 'react';
import ContextProvider from '../contexts/ContextProvider';
import AppBar from '../components/AppBar';
import Footer from '../components/Footer';
import 'styles/globals.css';
import Notification from '../components/Notification';

require("@solana/wallet-adapter-react-ui/styles.css");


const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
  <div>

    <ContextProvider>
      <Head>
        <title>Solana Token Starter File</title>
        <meta name="description" content="Solana Token Starter File" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppBar />
      <Component {...pageProps} />
      <Footer />
      <Notification />
    </ContextProvider>

    {/*SCRIPT*/}
    <script src="assets/libs/preline/preline.js"></script>
    <script src="assets/libs/swiper/swiper-bundle.js"></script>
    <script src="assets/libs/gumshoesjs/gumshoe.polyfills.min.js"></script>
    <script src="assets/libs/lucide/lucide.min.js"></script>
    <script src="assets/libs/aos/aos.js"></script>
    <script src="assets/js/swiper.js"></script>
    <script src="assets/js/theme.js"></script>
  </div>
  );
};

export default MyApp;