import React from 'react'
import { useRouter } from 'next/router'
import { courseService } from '../../../services'
import { useTranslation } from 'next-i18next'
import { getStaticPaths, getI18nProps } from '../../../lib/getStatic'
import Image from 'next/legacy/image'

import { Container, Col, Row } from 'reactstrap'
import Link from 'next/link'

const Index = ({ courses }) => {
    const { t } = useTranslation('courses')
    const router = useRouter()

    if (!router.isFallback && !courses) {
        return <div>Error</div>
    }

    return (
        <Container className="mt-5">
            <h1 className="mb-4">{t('page_title')}</h1>
            {courses?.data.map((course, i) => (
                <React.Fragment key={course.id}>
                    <Row className="mt-5" id={course.type}>
                        <Col
                            className={`${
                                i % 2 === 0 ? 'order-1' : 'order-2 ps-5'
                            }`}
                            lg={5}>
                            <h2>
                                {router.locale === 'en'
                                    ? course.title_en
                                    : course.title_fr}
                            </h2>
                            <h5>{course.price}$</h5>
                            <h5>
                                {router.locale === 'en'
                                    ? course.duration_en
                                    : course.duration_fr}
                            </h5>
                            <h6 className="mt-4 w-75">
                                {router.locale === 'en'
                                    ? course.description_en
                                    : course.description_fr}
                            </h6>
                            {course.skills.length > 0 && (
                                <>
                                    <h3 className="mt-5">
                                        {t('skills_title')}
                                    </h3>
                                    <ul className="text-start mt-3">
                                        {course.skills.map(skill => (
                                            <li key={skill.id}>
                                                {router.locale === 'en'
                                                    ? skill.name_en
                                                    : skill.name_fr}
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            )}

                            {/* <Link href={`/reservations?type=${course.type}`}>
                                <a className="mt-5 btn btn-primary px-5 py-2">
                                    {t('book_now')}
                                </a>
                            </Link> */}
                            <Link
                                href={`/contact-us`}
                                className="mt-5 btn btn-primary px-5 py-2">
                                {t('contact_us')}
                            </Link>
                        </Col>
                        <Col
                            className={`${i % 2 === 0 ? 'order-2' : 'order-1'}`}
                            lg={7}>
                            <Image
                                layout="responsive"
                                objectFit="cover"
                                src={course.image_path}
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
