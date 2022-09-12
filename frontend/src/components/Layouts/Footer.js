import Link from 'next/link'
import { faFerry } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
                        <a
                            style={{ width: '30px' }}
                            href="https://facebook.com/profile.php?id=100083298454847">
                            <FontAwesomeIcon icon={faFerry} size="xs" />
                        </a>
                    </Col>
                    <Col
                        className="d-flex flex-column justify-content-center"
                        md={3}>
                        <Image
                            layout="responsive"
                            objectFit="cover"
                            src={logoVoileCanada}
                            width={500}
                            height={500}
                            alt=""
                        />
                        <Image
                            layout="responsive"
                            objectFit="cover"
                            src={logoVoileQuebec}
                            width={100}
                            height={100}
                            alt=""
                        />
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
