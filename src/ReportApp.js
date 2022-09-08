import React from 'react'
import { AppRoutes } from './routes/AppRoutes'
import { Provider } from 'react-redux'
import { store } from './store/store'
import './styles/styles.scss'
import { Toaster } from 'react-hot-toast'

export const ReportApp = () => {

    return (
        <Provider store={store}>
            <Toaster position="top-center" reverseOrder={false} />
            <AppRoutes />
        </Provider>
    )
}
