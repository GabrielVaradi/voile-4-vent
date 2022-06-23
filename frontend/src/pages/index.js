import React from 'react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const Home = () => {
    const { t } = useTranslation('home')
    return <div> {t('home')}</div>
}

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['home', 'navigation'])),
        },
    }
}

export default Home
