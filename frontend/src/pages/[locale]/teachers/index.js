import React from 'react'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import { getStaticPaths, getI18nProps } from '../../../lib/getStatic'
import { teacherService } from '@/services'

const Index = () => {
    const { t } = useTranslation('teachers')

    return (
        <>
            <Head>
                <title> Voile 4 vents Instructors </title>
                <meta
                    name="description"
                    content="These are the instructors of Voile 4 vents who will help you learn all you need to know about sailing"
                />
            </Head>
            <div> {t('teachers')}</div>
        </>
    )
}

export { getStaticPaths }
export const getStaticProps = async ctx => {
    const teachers = await teacherService.index()

    return {
        props: {
            ...(await getI18nProps(ctx, ['teachers', 'navigation', 'footer'])),
            teachers,
        },
    }
}

export default Index
