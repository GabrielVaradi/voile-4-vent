import React from 'react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const Index = () => {
    const { t } = useTranslation('teachers')

    // useEffect(() => {
    //     courseService.index().then(({ data }) => console.log(data))
    // }, [])

    return (
        <>
            <div> {t('teachers')}</div>
        </>
    )
}

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                'teachers',
                'navigation',
                'footer',
            ])),
        },
    }
}

export default Index
