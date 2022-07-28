import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { courseService } from '../../services'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Image from 'next/image'

import {
    DropdownItem,
    DropdownMenu,
    Pagination,
    PaginationItem,
    PaginationLink,
    UncontrolledDropdown,
    DropdownToggle,
    Container,
    Col,
    Row,
} from 'reactstrap'
import { toast } from 'react-toastify'
import Head from 'next/head'
import Link from 'next/link'

const Index = () => {
    const [courses, setCourses] = useState([])

    const { t } = useTranslation('courses')
    const router = useRouter()

    useEffect(() => {
        courseService.index().then(({ data }) => setCourses(data))
    }, [])

    return (
        <Container className="mt-5">
            {courses.map((course, i) => (
                <Row key={course.id} className="mt-5">
                    <Col
                        className={`${i % 2 === 0 ? 'order-1' : 'order-2'}`}
                        md={5}>
                        <div>
                            {router.locale === 'en'
                                ? course.title_en
                                : course.title_fr}
                        </div>
                        <div>{course.price}</div>
                        <div>
                            {router.locale === 'en'
                                ? course.duration_en
                                : course.duration_fr}
                        </div>
                        <Link href="/reservations">
                            <a className="mt-5 btn btn-primary px-5 py-2">
                                {t('book')}
                            </a>
                        </Link>
                    </Col>
                    <Col
                        className={`${i % 2 === 0 ? 'order-2' : 'order-1'}`}
                        md={7}>
                        <Image
                            layout="responsive"
                            objectFit="cover"
                            src={course.image_path}
                            width={500}
                            height={500}
                            alt=""
                        />
                    </Col>
                    <Col className="mt-3 order-3" md={12}>
                        <div>
                            {router.locale === 'en'
                                ? course.title_en
                                : course.title_fr}
                        </div>
                        <div>
                            {router.locale === 'en'
                                ? course.description_en
                                : course.description_fr}
                        </div>
                        {/* TODO: skills*/}
                    </Col>
                </Row>
            ))}
        </Container>
    )
}

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                'courses',
                'navigation',
                'footer',
            ])),
        },
    }
}

export default Index
