import React from 'react'
import { useRouter } from 'next/router'
import { Container, Row, Col } from 'reactstrap'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import ImageFull from '@/components/Images/ImageFull'
import Image from "next/legacy/image"
import mainPicture from '../../public/images/home/voile4vents_main.jpg'
import dynamic from 'next/dynamic'

import { courseService, teacherService } from '@/services'
import Link from 'next/link'
import styles from '../../styles/Pages/Home.module.scss'
const VideoFull = dynamic(() => import('@/components/Videos/VideoFull'), {
    ssr: false,
})

const Home = ({ courses, teachers }) => {
    const { t } = useTranslation('home')
    const router = useRouter()

    if (!router.isFallback && (!courses || !teachers)) {
        return <div>Error</div>
    }

    return (
        <div className="homepage">
            <ImageFull ragged src={mainPicture} alt="Home">
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
                    {courses?.map(course => (
                        <Col
                            className="text-center text-white bg-primary mx-3 p-0 d-flex flex-column my-3 my-lg-0"
                            key={course.id}
                            lg={3}>
                            <div>
                                <Image
                                    layout="responsive"
                                    objectFit="cover"
                                    src={course.image_path}
                                    width={500}
                                    height={500}
                                    alt=""
                                />
                            </div>

                            <div className="my-3 px-3">
                                {router.locale === 'en'
                                    ? course.title_en
                                    : course.title_fr}
                            </div>
                            <div className="mb-4 px-3">
                                {router.locale === 'en'
                                    ? course.description_en
                                    : course.description_fr}
                            </div>
                            <div className="d-flex mt-auto">
                                <Link
                                    href={`/courses#${course.type}`}
                                    className="btn btn-link text-white border-0 mx-auto mb-3">
                                    {t('learn_more')}
                                </Link>
                                {/* <Link
                                    href={`/reservations?type=${course.type}`}>
                                    <a className="btn btn-primary bg-white text-black border-0 mx-auto mb-3">
                                        {t('registration')}
                                    </a>
                                </Link> */}
                            </div>
                        </Col>
                    ))}
                </Row>
                <Link
                    href="/courses"
                    className="mt-5 btn btn-primary px-5 py-2">
                    {t('courses')}
                </Link>
            </Container>

            <Container className="d-flex flex-column justify-content-center align-items-center mt-5">
                <Row>
                    <Col lg={8} className="mx-auto">
                        <h1 className="text-center text-uppercase text-primary">
                            {t('teachers_title')}
                        </h1>
                        <h5 className="text-center">
                            {t('teachers_description')}
                        </h5>
                    </Col>
                </Row>
                <Row className="mt-5 justify-content-center">
                    {teachers?.map(teacher => (
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
                                    alt=""
                                />
                            </div>

                            <div className="p-3">
                                <div className="mb-3">
                                    {router.locale === 'en'
                                        ? teacher.title_en
                                        : teacher.title_fr}
                                </div>
                                <div>
                                    {router.locale === 'en'
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
    )
}

export async function getStaticProps({ locale }) {
    const courses = await courseService.index()
    const teachers = await teacherService.index()

    return {
        props: {
            courses: courses.data,
            teachers: teachers.data,
            ...(await serverSideTranslations(locale, [
                'home',
                'navigation',
                'footer',
            ])),
        },
    }
}

export default Home
