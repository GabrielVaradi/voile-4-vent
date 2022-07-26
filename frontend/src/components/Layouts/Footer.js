import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { useTranslation } from 'next-i18next'
import styles from '../../../styles/Layouts/Footer.module.scss'

const Footer = () => {
    const router = useRouter()
    const { t } = useTranslation('footer')

    return (
        <div className={`mt-5 ${styles.footer}`}>
            <Container className="w-100 h-100 d-flex ">
                <Row className="w-100 h-100">
                    <Col
                        className="d-flex flex-column justify-content-center"
                        md={6}>
                        <h4>Voile 4 vents</h4>
                        <h4>
                            Voile 4 ventsVoile 4 ventsVoile 4 ventsVoile 4
                            ventsVoile 4 ventsVoile 4 ventsVoile 4 vents Voile 4
                            vents
                        </h4>
                        <div> Facebook icon</div>
                    </Col>
                    <Col
                        className="d-flex flex-column justify-content-center"
                        md={3}>
                        <div> Logo </div>
                        <div> Logo </div>
                    </Col>
                    <Col
                        className="d-flex flex-column justify-content-center"
                        md={3}>
                        <div> Page </div>
                        <div> Page </div>
                        <div> Page </div>
                        <div> Page </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Footer
