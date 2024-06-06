import Link from '../Link'
import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { useTranslation } from 'next-i18next'
import Image from 'next/legacy/image'
import logoVoileCanada from '../../../public/images/footer/voile4vents_voile-canada.png'
import logoVoileQuebec from '../../../public/images/footer/voile4vents_voile-quebec.png'

const Footer = () => {
    const { t } = useTranslation('footer')

    return (
        <div className="fs-5 bg-primary text-white">
            <Container className="d-flex py-3">
                <Row className="w-100">
                    <Col
                        className="d-flex flex-column justify-content-center align-items-center align-items-lg-start"
                        lg={4}>
                        <div className="text-uppercase">{t('title')}</div>
                        <div className="fw-bold mt-3">{t('phone_key')}</div>
                        <div>{t('phone_value')}</div>
                        <div className="fw-bold mt-3">{t('email_key')}</div>
                        <div>{t('email_value')}</div>
                        <div className="fw-bold mt-3">{t('address_key')}</div>
                        <div>{t('address_value_1')}</div>
                        <div>{t('address_value_2')}</div>
                        <a
                            className="mt-2"
                            href="https://facebook.com/voile4vents">
                            <i
                                className="fa fa-facebook"
                                style={{ fontSize: '30px' }}
                            />
                        </a>
                    </Col>
                    <Col className="d-flex flex-column justify-content-center align-items-center mb-5 mb-lg-0">
                        <Link
                            href="/courses"
                            className="fs-5 text-decoration-none my-2 text-white ">
                            {t('courses')}
                        </Link>
                        <Link
                            href="/activities"
                            className="fs-5 text-decoration-none my-2 text-white">
                            {t('activities')}
                        </Link>
                        {/* <Link
                            href="/reservations"
                            className="fs-5 text-decoration-none my-2 text-white">
                            {t('reservations')}
                        </Link> */}
                        <Link
                            href="/contact-us"
                            className="fs-5 text-decoration-none my-2 text-white">
                            {t('contact-us')}
                        </Link>
                        <Link
                            href="/faq"
                            className="fs-5 text-decoration-none my-2 text-white">
                            {t('faq')}
                        </Link>
                    </Col>
                    <Col
                        className="d-flex flex-column justify-content-center align-items-center"
                        lg={{ size: 3, offset: 2 }}>
                        <div className="mb-2 fw-bold">{t('accreditation')}</div>
                        <div className=" mb-2 w-50">
                            <Image
                                layout="responsive"
                                objectFit="contain"
                                src={logoVoileCanada}
                                width={100}
                                height={100}
                                alt="Logo voile canada"
                            />
                        </div>
                        <div className="w-50">
                            <Image
                                layout="responsive"
                                objectFit="contain"
                                src={logoVoileQuebec}
                                width={100}
                                height={100}
                                alt="Logo voile quebec"
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
