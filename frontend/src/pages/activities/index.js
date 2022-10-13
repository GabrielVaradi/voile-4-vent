import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { activityService } from '../../services'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Image from 'next/image'

import { Container, Col, Row } from 'reactstrap'
import Link from 'next/link'

const Index = () => {
    const [activities, setActivities] = useState([])

    const { t } = useTranslation('activities')
    const router = useRouter()

    useEffect(() => {
        activityService.index().then(({ data }) => setActivities(data))
    }, [])

    return (
        <Container className="mt-5">
            {activities.map((activity, i) => (
                <React.Fragment key={activity.id}>
                    <Row className="mt-5">
                        <Col
                            className={`${
                                i % 2 === 0 ? 'order-1' : 'order-2 ps-5'
                            }`}
                            md={5}>
                            <h2>
                                {router.locale === 'en'
                                    ? activity.title_en
                                    : activity.title_fr}
                            </h2>
                            <h5>{activity.price}$</h5>
                            <h5>
                                {router.locale === 'en'
                                    ? activity.duration_en
                                    : activity.duration_fr}
                            </h5>
                            <h6 className="mt-4 w-75 lh-lg">
                                {router.locale === 'en'
                                    ? activity.description_en
                                    : activity.description_fr}
                            </h6>
                            <Link href={`/contact-us`}>
                                <a className="mt-5 btn btn-primary px-5 py-2">
                                    {t('contact_us')}
                                </a>
                            </Link>
                        </Col>
                        <Col
                            className={`${i % 2 === 0 ? 'order-2' : 'order-1'}`}
                            md={7}>
                            <Image
                                layout="responsive"
                                objectFit="cover"
                                src={activity.image_path}
                                width={500}
                                height={500}
                                priority
                                alt=""
                            />
                        </Col>
                    </Row>
                </React.Fragment>
            ))}
        </Container>
    )
}

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                'activities',
                'navigation',
                'footer',
            ])),
        },
    }
}

export default Index