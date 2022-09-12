import React from 'react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const Index = () => {
    const { t } = useTranslation('contact-us')

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
                'footer',
            ])),
        },
    }
}

export default Index
