import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Container, Row, Col, Button } from 'reactstrap'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import ImageFull from '@/components/Images/ImageFull'
import Image from 'next/image'
import picture from '../../public/images/shutterstock_717244969.jpg'
import { courseService, teacherService } from '@/services'
import Link from 'next/link'
import styles from '../../styles/Pages/Home.module.scss'

const Home = () => {
    const [courses, setCourses] = useState([])
    const [teachers, setTeachers] = useState([])

    const { t } = useTranslation('home')
    const router = useRouter()

    useEffect(() => {
        courseService.index().then(({ data }) => setCourses(data))
    }, [])

    useEffect(() => {
        teacherService.index().then(({ data }) => setTeachers(data))
    }, [])

    console.log(teachers)

    return (
        <div className="homepage">
            <ImageFull ragged src={picture} alt="Home">
                <Container className="h-100 d-flex flex-column justify-content-center">
                    <Row>
                        <Col
                            md={6}
                            className="d-flex flex-column align-items-center">
                            <h1 className="text-uppercase text-primary">
                                {t('title')}
                            </h1>
                            <h5 className="text-uppercase">
                                {t('description')}
                            </h5>
                            {/*<Button className=""> {t('learn_more')}</Button>*/}
                            <a
                                href="https://squareup.com/appointments/book/5xqjj79up2ibx0/L5RT2XMJJXK9V/start"
                                className="btn btn-primary bg-white text-black border-0 mt-3"
                                target="_blank"
                                rel="noreferrer">
                                {t('learn_more')}
                            </a>
                        </Col>
                    </Row>
                </Container>
            </ImageFull>

            <Container className="d-flex flex-column justify-content-center align-items-center mt-5">
                <Row>
                    <Col md={8} className="mx-auto">
                        <h1 className="text-center text-uppercase text-primary">
                            {t('courses_title')}
                        </h1>
                        <h5 className="text-center">
                            {t('courses_description')}
                        </h5>
                    </Col>
                </Row>
                <Row className="mt-5 justify-content-center">
                    {courses.map(course => (
                        <Col
                            className="text-center text-white bg-primary mx-3 p-0"
                            key={course.id}
                            md={3}>
                            <Image
                                layout="responsive"
                                objectFit="cover"
                                src={course.image_path}
                                width={500}
                                height={500}
                                alt=""
                            />
                            <div className="p-3">
                                <div className="mb-3">
                                    {router.locale === 'en'
                                        ? course.title_en
                                        : course.title_fr}
                                </div>
                                <div>
                                    {router.locale === 'en'
                                        ? course.description_en
                                        : course.description_fr}
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
                <Link href="/courses">
                    <a className="mt-5 btn btn-primary px-5 py-2">
                        {t('courses')}
                    </a>
                </Link>
            </Container>

            <Container className="d-flex flex-column justify-content-center align-items-center mt-5">
                <Row>
                    <Col md={8} className="mx-auto">
                        <h1 className="text-center text-uppercase text-primary">
                            {t('teachers_title')}
                        </h1>
                        <h5 className="text-center">
                            {t('teachers_description')}
                        </h5>
                    </Col>
                </Row>
                <Row className="mt-5 justify-content-center">
                    {teachers.map(teacher => (
                        <Col
                            className="text-center text-white bg-primary mx-3 p-0"
                            key={teacher.id}
                            md={3}>
                            <Image
                                layout="responsive"
                                objectFit="cover"
                                src={teacher.image_path}
                                width={500}
                                height={500}
                                alt=""
                            />
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

            <ImageFull containerClasses="mt-5" ragged src={picture} alt="Home">
                <Container className="h-100 d-flex flex-column">
                    <Row>
                        <Col
                            md={4}
                            className={`d-flex flex-column ${styles.bottom_image}`}>
                            <h1 className="text-uppercase text-white d-flex">
                                <div className="text-primary me-2">
                                    {t('image_first_word')}
                                </div>
                                {t('image_first_line')}
                            </h1>
                            <h1 className="text-uppercase text-white">
                                {t('image_second_line')}
                            </h1>
                        </Col>
                    </Row>
                </Container>
            </ImageFull>
        </div>
    )
}

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                'home',
                'navigation',
                'footer',
            ])),
        },
    }
}

export default Home
