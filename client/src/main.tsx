import { IsOpenModalProvider } from './providers/modalProvider'
import router from './router/router'
import './styles/index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <IsOpenModalProvider>
      <RouterProvider router={router} />
    </IsOpenModalProvider>
  </React.StrictMode>
)
