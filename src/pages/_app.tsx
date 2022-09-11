import '../../styles/globals.css'
import type { AppProps } from 'next/app'
import { StylesProvider } from "@material-ui/styles";
import { createTheme } from '@material-ui/core/styles'
import { initialState, reducers } from '../reducers/provider';
import { ThemeProvider } from 'styled-components';
import { StoreProvider } from 'store/Store';

function MyApp({ Component, pageProps }: AppProps) {
  const defaultTheme = createTheme({
    palette:{
      type: 'dark',
    }
  });

  console.log("Default theme passing to ThemeProvider", defaultTheme);

  return (
    <StoreProvider initialState={initialState} reducers={reducers}>
      <StylesProvider>
        <ThemeProvider theme={defaultTheme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </StylesProvider>
    </StoreProvider>
  )
}

export default MyApp
