import React from 'react'
import Navigation from '@/components/Layouts/Navigation'
import { Container } from 'reactstrap'
import { ToastContainer } from 'react-toastify'

const AppLayout = ({ children }) => {
    return (
        <>
            <Navigation />
            <ToastContainer />
            <Container className={'mt-3'}>
                <div>
                    <div>{children}</div>
                </div>
            </Container>
        </>
    )
}

export default AppLayout
