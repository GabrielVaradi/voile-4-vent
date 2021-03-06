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
                <>
                    <Row key={course.id} className="mt-5">
                        <Col
                            className={`${i % 2 === 0 ? 'order-1' : 'order-2'}`}
                            md={5}>
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
                                <h3 className="mt-5">{t('skills_title')}</h3>
                            )}
                            <ul className="text-start mt-3">
                                {course.skills.map(skill => (
                                    <li key={skill.id}>
                                        {router.locale === 'en'
                                            ? skill.name_en
                                            : skill.name_fr}
                                    </li>
                                ))}
                            </ul>
                            <Link href="/reservations">
                                <a className="mt-5 btn btn-primary px-5 py-2">
                                    {t('book_now')}
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
                                priority
                                alt=""
                            />
                        </Col>
                    </Row>
                </>
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
