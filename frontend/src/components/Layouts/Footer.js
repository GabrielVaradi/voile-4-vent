import Link from '../Link'
import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { useTranslation } from 'next-i18next'
import styles from '../../../styles/Layouts/Footer.module.scss'
import Image from 'next/legacy/image'
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
                        <h4>{t('address_value_1')}</h4>
                        <h4>{t('address_value_2')}</h4>
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
                        <Link
                            href="/courses"
                            className="h4 text-decoration-none mt-1 text-black ">
                            {t('courses')}
                        </Link>
                        <Link
                            href="/activities"
                            className="h4 text-decoration-none mt-1 text-black">
                            {t('activities')}
                        </Link>
                        {/* <Link
                            href="/reservations"
                            className="h4 text-decoration-none mt-1 text-black">
                            {t('reservations')}
                        </Link> */}
                        <Link
                            href="/contact-us"
                            className="h4 text-decoration-none mt-1 text-black">
                            {t('contact-us')}
                        </Link>
                        {/* <Link
                            href="/faq"
                            className="h4 text-decoration-none mt-1 text-black">
                            {t('faq')}
                        </Link> */}
                    </Col>
                    <Col
                        className="d-flex flex-column justify-content-center align-items-center"
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
                        <br />
                        ©Gabriel Varadi
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Footer
