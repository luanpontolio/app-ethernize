import '../../styles/globals.css'
import type { AppProps } from 'next/app'
import { StylesProvider } from "@material-ui/styles";
import { createTheme } from '@material-ui/core/styles'
import { ThemeProvider } from 'styled-components'

function MyApp({ Component, pageProps }: AppProps) {
  const defaultTheme = createTheme();

  console.log("Default theme passing to ThemeProvider", defaultTheme);

  return (
    <StylesProvider>
      <ThemeProvider theme={defaultTheme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </StylesProvider>
  )
}

export default MyApp
