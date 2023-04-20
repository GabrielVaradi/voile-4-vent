import React from 'react'
import { useRouter } from 'next/router'
import { activityService } from '../../../services'
import { useTranslation } from 'next-i18next'
import { getStaticPaths, getI18nProps } from '../../../lib/getStatic'
import Image from 'next/legacy/image'
import Head from 'next/head'
import { Container, Col, Row } from 'reactstrap'
import Link from '../../../components/Link'

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
                <h1 className="mb-4">{t('page_title')}</h1>
                {activities?.data.map((activity, i) => (
                    <React.Fragment key={activity.id}>
                        <Row className="mt-5">
                            <Col
                                className={`${
                                    i % 2 === 0 ? 'order-1' : 'order-2 ps-5'
                                }`}
                                lg={5}>
                                <h2>
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
                                <h6 className="mt-4 w-75 lh-lg">
                                    {query.locale === 'en'
                                        ? activity.description_en
                                        : activity.description_fr}
                                </h6>
                                <Link
                                    href={`/contact-us`}
                                    className="mt-5 btn btn-primary px-5 py-2">
                                    {t('contact_us')}
                                </Link>
                            </Col>
                            <Col
                                className={`${
                                    i % 2 === 0 ? 'order-2' : 'order-1'
                                }`}
                                lg={7}>
                                <Image
                                    layout="responsive"
                                    objectFit="cover"
                                    src={activity.image_path}
                                    width={500}
                                    height={500}
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
