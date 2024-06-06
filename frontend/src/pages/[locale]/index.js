import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Container, Row, Col } from 'reactstrap'
import { useTranslation } from 'next-i18next'
import ImageFull from '@/components/Images/ImageFull'
import Image from 'next/legacy/image'
import mainPicture from '../../../public/images/home/voile4vents_main.jpg'
import dynamic from 'next/dynamic'
import { getStaticPaths, getI18nProps } from '../../lib/getStatic'

import { courseService, teacherService } from '@/services'
import { reservableCoursesType } from '@/constants/courses.constants'
import Link from '../../components/Link'
import styles from '../../../styles/Pages/Home.module.scss'
const VideoFull = dynamic(() => import('@/components/Videos/VideoFull'), {
    ssr: false,
})

const Home = ({ courses, teachers }) => {
    const { t } = useTranslation('home')
    const { isFallback, query } = useRouter()

    if (!isFallback.isFallback && (!courses || !teachers)) {
        return <div>Error</div>
    }

    return (
        <>
            <Head>
                <title> Voile 4 vents Homepage </title>
                <meta
                    name="description"
                    content="Homepage of Voile 4 vents. Meet our instructors, checkout our courses and get ready to book your course!"
                />
            </Head>
            <div className="homepage">
                <ImageFull ragged src={mainPicture} alt="Home hero image">
                    <Container className="h-100 d-flex flex-column justify-content-center">
                        <Row>
                            <Col
                                lg={5}
                                className="d-flex flex-column align-items-center">
                                <h1 className="text-uppercase text-primary text-center">
                                    {t('title')}
                                </h1>
                                <h5 className="text-uppercase">
                                    {t('description')}
                                </h5>
                                <Link
                                    href="/courses"
                                    className="btn btn-primary bg-white text-black border-0 mt-3">
                                    {t('learn_more')}
                                </Link>
                            </Col>
                        </Row>
                    </Container>
                </ImageFull>

                <Container className="d-flex flex-column justify-content-center align-items-center mt-5">
                    <Row>
                        <Col lg={12} className="mx-auto">
                            <h1 className="text-center text-uppercase text-primary">
                                {t('courses_title')}
                            </h1>
                            <h5 className="text-center">
                                {t('courses_description')}
                            </h5>
                            <br />
                            <h5 className="text-center fw-bold">
                                {t('courses_pierre')}
                            </h5>
                        </Col>
                    </Row>
                    <Row className="mt-5 justify-content-center">
                        {courses?.data.map(course => (
                            <Col
                                className="text-center text-white bg-primary mx-3 p-0 d-flex flex-column my-3"
                                key={course.id}
                                lg={3}>
                                <div>
                                    <Image
                                        layout="responsive"
                                        objectFit="cover"
                                        src={course.image_path}
                                        width={500}
                                        height={500}
                                        alt={
                                            query.locale === 'en'
                                                ? course.title_en
                                                : course.title_fr
                                        }
                                    />
                                </div>

                                <div className="my-3 px-3">
                                    {query.locale === 'en'
                                        ? course.title_en
                                        : course.title_fr}
                                </div>
                                <div className="mb-4 px-3">
                                    {query.locale === 'en'
                                        ? course.description_en
                                        : course.description_fr}
                                </div>
                                <div className="d-flex justify-content-around mt-auto">
                                    <Link
                                        href={`/courses#${course.type}`}
                                        className="btn btn-link text-white border-0 mb-3">
                                        {t('learn_more')}
                                    </Link>
                                    {/* {reservableCoursesType.includes(
                                        course.type,
                                    ) && (
                                        <Link
                                            href={`/reservations?type=${course.type}`}
                                            className="btn btn-primary bg-white text-black border-0 mb-3 ms-5 ms-lg-0">
                                            {t('registration')}
                                        </Link>
                                    )} */}
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>

                <Container className="d-flex flex-column justify-content-center align-items-center mt-5">
                    <Row>
                        <Col className="mx-auto">
                            <h1 className="text-center text-uppercase text-primary">
                                {t('teachers_title')}
                            </h1>
                        </Col>
                    </Row>
                    <Row className="mt-5 justify-content-center">
                        {teachers?.data.map(teacher => (
                            <Col
                                className="text-center text-white bg-primary mx-3 p-0"
                                key={teacher.id}
                                lg={3}>
                                <div>
                                    <Image
                                        layout="responsive"
                                        objectFit="cover"
                                        src={teacher.image_path}
                                        width={500}
                                        height={500}
                                        as="style"
                                        alt={
                                            query.locale === 'en'
                                                ? teacher.title_en
                                                : teacher.title_fr
                                        }
                                    />
                                </div>

                                <div className="p-3">
                                    <div className="mb-3">
                                        {query.locale === 'en'
                                            ? teacher.title_en
                                            : teacher.title_fr}
                                    </div>
                                    <div>
                                        {query.locale === 'en'
                                            ? teacher.description_en
                                            : teacher.description_fr}
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>
                <VideoFull
                    containerClasses="mt-5"
                    ragged
                    src="/videos/home/voile4vents_video_footer.mov">
                    <Container className="h-100 d-flex flex-column align-items-end">
                        <Row className={`${styles.video_text_container}`}>
                            <Col lg={4} className="d-flex w-100">
                                <h1 className="text-uppercase text-white d-flex">
                                    <div className="text-primary me-2">
                                        {t('image_first_word')}
                                    </div>
                                    {t('image_first_line')}
                                </h1>
                            </Col>
                        </Row>
                    </Container>
                </VideoFull>
            </div>
        </>
    )
}

export { getStaticPaths }
export const getStaticProps = async ctx => {
    const courses = await courseService.index()
    const teachers = await teacherService.index()

    return {
        props: {
            ...(await getI18nProps(ctx, ['home', 'navigation', 'footer'])),
            courses,
            teachers,
        },
    }
}

export default Home
