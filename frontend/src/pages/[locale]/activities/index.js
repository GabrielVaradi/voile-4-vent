import React from 'react'
import { useRouter } from 'next/router'
import { activityService } from '../../../services'
import { useTranslation } from 'next-i18next'
import { getStaticPaths, getI18nProps } from '../../../lib/getStatic'
import Image from 'next/legacy/image'
import Head from 'next/head'
import { Container, Col, Row } from 'reactstrap'
import Link from '../../../components/Link'
import styles from '../../../../styles/Pages/Activities.module.scss'

const Index = ({ activities }) => {
    const { t } = useTranslation('activities')
    const { isFallback, query } = useRouter()

    if (isFallback && !activities) {
        return <div>Error</div>
    }

    return (
        <>
            <Head>
                <title> Voile 4 vents activities page </title>
                <meta
                    name="description"
                    content="Check out our activities if you want a different experience, maybe more relaxed with our sunset cruise or more of a team building experience with corporate sailing"
                />
            </Head>
            <Container className="mt-5">
                <h1 className="mb-5">{t('page_title')}</h1>
                {activities?.data.map((activity, i) => (
                    <React.Fragment key={activity.id}>
                        <Row className={`${styles.activityContainer}`}>
                            <Col
                                className={`text-center text-lg-start ${
                                    i % 2 === 0
                                        ? 'order-lg-1 pe-lg-5'
                                        : 'order-lg-2 ps-lg-5'
                                }`}
                                lg={5}>
                                <h2 className="fw-bold">
                                    {query.locale === 'en'
                                        ? activity.title_en
                                        : activity.title_fr}
                                </h2>
                                <h5>{activity.price}$</h5>
                                <h5>
                                    {query.locale === 'en'
                                        ? activity.duration_en
                                        : activity.duration_fr}
                                </h5>
                                <h5 className="mt-4 lh-lg">
                                    {query.locale === 'en'
                                        ? activity.description_en
                                        : activity.description_fr}
                                </h5>
                                {activity.pdf_path && (
                                    <h5 className="mt-3">
                                        <Link
                                            href="/files/courses/programme_croisiere_elementaire.pdf"
                                            target="_blank">
                                            {t('more_details')}
                                        </Link>
                                    </h5>
                                )}
                                <Link
                                    href={`/contact-us`}
                                    className="mt-0 mb-4 mb-lg-0 mt-lg-4 btn btn-primary px-5 py-2">
                                    {t('contact_us')}
                                </Link>
                            </Col>
                            <Col
                                className={`${styles.image} position-relative ${
                                    i % 2 === 0 ? 'order-lg-2' : 'order-lg-1'
                                }`}
                                lg={7}>
                                <Image
                                    layout="fill"
                                    objectFit="cover"
                                    src={activity.image_path}
                                    priority
                                    alt={
                                        query.locale === 'en'
                                            ? activity.title_en
                                            : activity.title_fr
                                    }
                                />
                            </Col>
                        </Row>
                    </React.Fragment>
                ))}
            </Container>
        </>
    )
}

export { getStaticPaths }
export const getStaticProps = async ctx => {
    const activities = await activityService.index()

    return {
        props: {
            ...(await getI18nProps(ctx, [
                'activities',
                'navigation',
                'footer',
            ])),
            activities,
        },
    }
}

export default Index
