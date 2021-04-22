import React from 'react';
import Head from 'next/head';
import {Provider} from "react-redux";
import { ThemeProvider } from '@material-ui/core/styles';
import { useStore } from "./store";
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme.js';
import '../styles/globals.css'
import '../styles/scss/FooterPlayer.scss';
import '../styles/scss/ControlsToggleButton.scss';
import '../styles/scss/Name.scss';
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'react-notifications-component/dist/theme.css'
import "@pathofdev/react-tag-input/build/index.css";
// import "react-spinkit/css/loaders-css.css"
import CustomMusicPlayer from "../components/player/CustomMusicPlayer";
import ReactNotification from "react-notifications-component";
function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (<Provider store={store}><React.Fragment>
    <Head>
      <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
    </Head>
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <ReactNotification />
      <Component {...pageProps} />
      <CustomMusicPlayer />
    </ThemeProvider>
  </React.Fragment>
  </Provider>);
}

export default MyApp
