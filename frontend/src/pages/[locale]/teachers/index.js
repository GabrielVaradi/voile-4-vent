import React from 'react'
import { useTranslation } from 'next-i18next'
import { getStaticPaths, getI18nProps } from '../../../lib/getStatic'
import { teacherService } from '@/services'

const Index = () => {
    const { t } = useTranslation('teachers')

    return (
        <>
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
