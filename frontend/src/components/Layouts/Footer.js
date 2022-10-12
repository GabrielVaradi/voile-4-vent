import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { useTranslation } from 'next-i18next'
import styles from '../../../styles/Layouts/Footer.module.scss'
import Image from 'next/image'
import logoVoileCanada from '../../../public/images/footer/voile4vents_voile-canada.png'
import logoVoileQuebec from '../../../public/images/footer/voile4vents_voile-quebec.png'

const Footer = () => {
    const router = useRouter()
    const { t } = useTranslation('footer')

    return (
        <div className={`mt-5 ${styles.footer}`}>
            <div className={styles.wavy} />
            <Container className="w-100 h-100 d-flex ">
                <Row className="w-100 h-100">
                    <Col
                        className="d-flex flex-column justify-content-center"
                        md={6}>
                        <h4>{t('title')}</h4>
                        <h4>{t('description')}</h4>
                        <a href="https://facebook.com/voile4vents">
                            <i
                                className="fa fa-facebook"
                                style={{ fontSize: '30px' }}
                            />
                        </a>
                    </Col>
                    <Col
                        className="d-flex flex-column justify-content-center"
                        md={3}>
                        <div className=" mb-2 w-50">
                            <Image
                                layout="responsive"
                                objectFit="cover"
                                src={logoVoileCanada}
                                width={100}
                                height={100}
                                alt=""
                            />
                        </div>
                        <div className="w-50">
                            <Image
                                layout="responsive"
                                objectFit="cover"
                                src={logoVoileQuebec}
                                width={100}
                                height={100}
                                alt=""
                            />
                        </div>
                    </Col>
                    <Col
                        className="d-flex flex-column justify-content-center"
                        md={3}>
                        <Link href="/courses">
                            <a className="navbar-brand">{t('courses')}</a>
                        </Link>
                        <Link href="/activities">
                            <a className="navbar-brand">{t('activities')}</a>
                        </Link>
                        <Link href="/reservations">
                            <a className="navbar-brand">{t('reservations')}</a>
                        </Link>
                        <Link href="/contact-us">
                            <a className="navbar-brand">{t('contact-us')}</a>
                        </Link>
                        <Link href="/faq">
                            <a className="navbar-brand">{t('faq')}</a>
                        </Link>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Footer
