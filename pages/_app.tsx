import React from 'react'
import '../styles/global.css'
import { ThemeProvider, createTheme } from '@mui/material'
import Theme from '../client/Theme'

const theme = createTheme({
    palette: {
        primary: {
            main: Theme.COLOR.PRIMARY,
        }
    },
    typography: {
        fontFamily: "Andika, sans-serif"
    }
})

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
        <Component {...pageProps} />
    </ThemeProvider>
  )
}
