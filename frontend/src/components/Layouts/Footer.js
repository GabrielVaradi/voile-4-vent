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
            <Container>
                <Row>
                    <Col md={5}>{t('footer')}</Col>
                    <Col md={2}>Image</Col>
                    <Col md={2}>Cours de voile</Col>
                </Row>
            </Container>
        </div>
    )
}

export default Footer
