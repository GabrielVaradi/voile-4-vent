import React from 'react'
import { useRouter } from 'next/router'
import { courseService } from '../../../services'
import { useTranslation } from 'next-i18next'
import { getStaticPaths, getI18nProps } from '../../../lib/getStatic'
import Image from 'next/legacy/image'
import Head from 'next/head'
import { Container, Col, Row } from 'reactstrap'
import Link from '../../../components/Link'
import styles from '../../../../styles/Pages/Courses.module.scss'
import { reservableCoursesType } from '@/constants/courses.constants'

const Index = ({ courses }) => {
    const { t } = useTranslation('courses')
    const { isFallback, query } = useRouter()

    if (isFallback && !courses) {
        return <div>Error</div>
    }

    return (
        <>
            <Head>
                <title> Voile 4 vents courses page </title>
                <meta
                    name="description"
                    content="Read up on courses, decide what skills you would like to learn and how much time you are willing to invest, then you can proceed with the reservation!"
                />
            </Head>
            <Container className="mt-5">
                <h1 className="mb-5">{t('page_title')}</h1>
                {courses?.data.map((course, i) => (
                    <React.Fragment key={course.id}>
                        <Row
                            className={`${styles.courseContainer}`}
                            id={course.type}>
                            <Col
                                className={`text-center text-lg-start mb-4 mb-0-lg ${
                                    i % 2 === 0
                                        ? 'order-lg-1 pe-lg-5'
                                        : 'order-lg-2 ps-lg-5'
                                }`}
                                lg={5}>
                                <h2 className="fw-bold">
                                    {query.locale === 'en'
                                        ? course.title_en
                                        : course.title_fr}
                                </h2>
                                <h5>
                                    {course.price}$ {t('per_person')}
                                </h5>
                                <h5>
                                    {query.locale === 'en'
                                        ? course.duration_en
                                        : course.duration_fr}
                                </h5>
                                <h5 className="mt-4 lh-lg">
                                    {query.locale === 'en'
                                        ? course.description_en
                                        : course.description_fr}
                                </h5>
                                {course.pdf_path && (
                                    <h5 className="mt-3">
                                        <Link
                                            href={course.pdf_path}
                                            target="_blank">
                                            {t('more_details')}
                                        </Link>
                                    </h5>
                                )}
                                {course.skills.length > 0 && (
                                    <>
                                        <h3 className="mt-5">
                                            {t('skills_title')}
                                        </h3>
                                        <ul
                                            className={`mt-3 ${styles.unorderedList}`}>
                                            {course.skills.map(skill => (
                                                <li key={skill.id}>
                                                    <h5>
                                                        {query.locale === 'en'
                                                            ? skill.name_en
                                                            : skill.name_fr}
                                                    </h5>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                                {/* {reservableCoursesType.includes(course.type) ? ( */}
                                {/* <Link
                                        href={`/reservations?type=${course.type}`}
                                        className="mt-4 btn btn-primary px-5 py-2">
                                        {t('book_now')}
                                    </Link>
                                ) : ( */}
                                <Link
                                    href={`/contact-us`}
                                    className="mt-0 mb-4 mb-lg-0 mt-lg-4 btn btn-primary px-5 py-2">
                                    {t('contact_us')}
                                </Link>
                                {/* )} */}
                            </Col>
                            <Col
                                className={`${styles.image} position-relative ${
                                    i % 2 === 0 ? 'order-lg-2' : 'order-lg-1'
                                }`}
                                lg={7}>
                                <Image
                                    layout="fill"
                                    objectFit="cover"
                                    src={course.image_path}
                                    priority
                                    alt={
                                        query.locale === 'en'
                                            ? course.title_en
                                            : course.title_fr
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
    const courses = await courseService.index()

    return {
        props: {
            ...(await getI18nProps(ctx, ['courses', 'navigation', 'footer'])),
            courses,
        },
    }
}

export default Index
