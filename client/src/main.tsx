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

// TODO: 2) Реализовать редактирование
// TODO: 3) Сделать на фронте вызов хранимой процедуры (вроде это добавление + указанного кол-ва дней для незавершенных проектов в project или это в task)
// TODO: 8) Из=за того, что обновляется isLoading происходит рывок, надо фиксить.
// добавить completed к задачам и таскам
