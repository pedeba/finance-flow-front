import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './app'
import './index.css'
import './styles/radix.css'
import { Toast } from 'radix-ui'

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <React.StrictMode>
      <Toast.Provider duration={3000}>
        <App />
        <Toast.Viewport className="ToastViewport" />
      </Toast.Provider>
    </React.StrictMode>
  )
}
