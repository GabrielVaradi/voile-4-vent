import React from 'react'
import Navigation from '@/components/Layouts/Navigation'
import { Container } from 'reactstrap'
import { ToastContainer } from 'react-toastify'

const AppLayout = ({ header, children }) => {
    return (
        <>
            <ToastContainer />
            <Container className={'mt-3'}>
                <div className="card">
                    {/* Page Heading */}
                    <div className="card-header">
                        <h5 className="m-0">{header}</h5>
                    </div>
                    {/* Page Content */}
                    <div className="card-body">{children}</div>
                </div>
            </Container>
        </>
    )
}

export default AppLayout
