import './App.css'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from '@/routes/routes'
import { ConfigProvider } from 'antd'
import { ThemeProvider } from 'styled-components'
import { theme } from './constants/theme'
import MessageListener from '@/components/messageListener'

function App() {
  return (
    <ConfigProvider
      theme={{
        cssVar: true,
        token: {
          ...theme.colors,
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
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
        <MessageListener />
      </ThemeProvider>
    </ConfigProvider>
  )
}

export default App
