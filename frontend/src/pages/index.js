import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Button } from 'reactstrap'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import ImageFull from '@/components/Images/ImageFull'
import Image from 'next/image'
import picture from '../../public/shutterstock_717244969.jpg'
import { courseService } from '@/services'

const Home = () => {
    const [courses, setCourses] = useState([])
    const { t } = useTranslation('home')

    useEffect(() => {
        courseService.index().then(({ data }) => setCourses(data))
    }, [])

    return (
        <div className="homepage">
            <ImageFull ragged src={picture} alt="Home">
                <Container className="h-100 d-flex flex-column justify-content-center">
                    <h1 className="text-uppercase">{t('title')}</h1>
                    <h5 className="text-uppercase">{t('description')}</h5>
                    <Button className=""> {t('learn_more')}</Button>
                </Container>
            </ImageFull>

            <Container className="d-flex flex-column justify-content-center align-items-center mt-5">
                <h1 className="text-center text-uppercase">
                    {t('courses_title')}
                </h1>
                <h5 className="text-center"> {t('courses_description')}</h5>
                <Row className="mt-5 justify-content-center">
                    {courses.map(course => (
                        <Col
                            className="text-center bg-info mx-3"
                            key={course.id}
                            md={3}>
                            <div className="mb-3">{course.title}</div>
                            <div>{course.description}</div>
                            {/*{course.image}*/}
                            {/*<Image layout="fill" src={picture} />*/}
                        </Col>
                    ))}
                </Row>
                <Button className="mt-5">{t('registration')}</Button>
            </Container>
        </div>
    )
}

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['home', 'navigation'])),
        },
    }
}

export default Home
