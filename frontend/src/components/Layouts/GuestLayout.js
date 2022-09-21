import Navigation from '@/components/Layouts/Navigation'
import { Container } from 'reactstrap'

const GuestLayout = ({ children }) => {
    return (
        <>
            <Navigation />

            <Container className={'mt-3'}>
                <div className="card">
                    {/* Page Heading */}
                    <div className="card-header">
                        <h5 className="m-0">Login</h5>
                    </div>
                    {/* Page Content */}
                    <div className="card-body">{children}</div>
                </div>
            </Container>
        </>
    )
}

export default GuestLayout
