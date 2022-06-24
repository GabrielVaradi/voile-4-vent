import React from 'react'
import Navigation from '@/components/Layouts/Navigation'
import Footer from '@/components/Layouts/Footer'
import { ToastContainer } from 'react-toastify'

const AppLayout = ({ children }) => {
    return (
        <>
            <Navigation />
            <ToastContainer />
            {children}
            <Footer />
        </>
    )
}

export default AppLayout
