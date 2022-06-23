import React, { useEffect } from 'react'
import { courseService } from '../../services'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

// import {
//     DropdownItem,
//     DropdownMenu,
//     Pagination,
//     PaginationItem,
//     PaginationLink,
//     UncontrolledDropdown,
//     DropdownToggle,
// } from 'reactstrap'
// import { toast } from 'react-toastify'
// import Head from 'next/head'
// import Link from 'next/link'

const Index = () => {
    const { t } = useTranslation('contact-us')

    // useEffect(() => {
    //     courseService.index().then(({ data }) => console.log(data))
    // }, [])

    return (
        <>
            <div> {t('contact-us')}</div>
        </>
    )
}

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                'contact-us',
                'navigation',
            ])),
        },
    }
}

export default Index
