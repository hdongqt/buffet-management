import './App.css'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from '@/routes/routes'
import { ConfigProvider, App as AppAnt } from 'antd'
import { ThemeProvider } from 'styled-components'
import { theme } from './constants/theme'

function App() {
  return (
    <ConfigProvider
      theme={{
        cssVar: true,
        token: {
          colorPrimary: '#0463e8',
          colorComplete: '#52c41a',
          colorInProgress: '#faad14',
          colorInComplete: '#f5222d',
          fontFamily: "'Quicksand', 'Segoe UI', Roboto, sans-serif",
        },
        components: {
          Menu: {
            itemHeight: 48,
            itemPaddingInline: 24,
            fontSize: 16,
            iconSize: 18,
          },
        },
      }}
    >
      <ThemeProvider theme={theme}>
        <AppAnt>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AppAnt>
      </ThemeProvider>
    </ConfigProvider>
  )
}

export default App
