import Link from 'next/link'
import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { useTranslation } from 'next-i18next'
import styles from '../../../styles/Layouts/Footer.module.scss'
import Image from 'next/image'
import logoVoileCanada from '../../../public/images/footer/voile4vents_voile-canada.png'
import logoVoileQuebec from '../../../public/images/footer/voile4vents_voile-quebec.png'

const Footer = () => {
    const { t } = useTranslation('footer')

    return (
        <div className={`mt-5 ${styles.footer}`}>
            <div className={styles.wavy} />
            <Container className="w-100 h-100 d-flex ">
                <Row className="w-100 h-100">
                    <Col
                        className="d-flex flex-column justify-content-center"
                        lg={6}>
                        <h4>{t('title')}</h4>
                        <h4 className="fw-bold">{t('phone_key')}</h4>
                        <h4>{t('phone_value')}</h4>
                        <h4 className="fw-bold">{t('email_key')}</h4>
                        <h4>{t('email_value')}</h4>
                        <h4 className="fw-bold">{t('address_key')}</h4>
                        <h4>{t('address_value')}</h4>
                        <a
                            className="mt-2"
                            href="https://facebook.com/voile4vents">
                            <i
                                className="fa fa-facebook"
                                style={{ fontSize: '30px' }}
                            />
                        </a>
                    </Col>
                    <Col
                        className="d-flex flex-column justify-content-center align-items-center"
                        lg={3}>
                        <Link href="/courses">
                            <a className="h4 text-decoration-none mt-1 text-black ">
                                {t('courses')}
                            </a>
                        </Link>
                        <Link href="/activities">
                            <a className="h4 text-decoration-none mt-1 text-black">
                                {t('activities')}
                            </a>
                        </Link>
                        <Link href="/reservations">
                            <a className="h4 text-decoration-none mt-1 text-black">
                                {t('reservations')}
                            </a>
                        </Link>
                        <Link href="/contact-us">
                            <a className="h4 text-decoration-none mt-1 text-black">
                                {t('contact-us')}
                            </a>
                        </Link>
                        <Link href="/faq">
                            <a className="h4 text-decoration-none mt-1 text-black">
                                {t('faq')}
                            </a>
                        </Link>
                    </Col>
                    <Col
                        className="d-flex flex-column justify-content-center align-items-end"
                        lg={3}>
                        <div>{t('accreditation')}</div>
                        <div className=" mb-2 w-50">
                            <Image
                                layout="responsive"
                                objectFit="contain"
                                src={logoVoileCanada}
                                width={100}
                                height={100}
                                alt=""
                            />
                        </div>
                        <div className="w-50">
                            <Image
                                layout="responsive"
                                objectFit="contain"
                                src={logoVoileQuebec}
                                width={100}
                                height={100}
                                alt=""
                            />
                        </div>
                    </Col>
                    <Col className="d-flex justify-content-end">
                        ©Gabriel Varadi
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Footer
