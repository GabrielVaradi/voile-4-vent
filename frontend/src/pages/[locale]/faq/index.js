import React, { useState, useMemo } from 'react'
import { useRouter } from 'next/router'
import { faqService } from '../../../services'
import {
    Container,
    Accordion,
    AccordionBody,
    AccordionHeader,
    AccordionItem,
} from 'reactstrap'
import { useTranslation } from 'next-i18next'
import { getStaticPaths, getI18nProps } from '../../../lib/getStatic'

const Index = ({ faqs }) => {
    const { t } = useTranslation('faq')
    const { isFallback, query } = useRouter()

    if (isFallback && !faqs) {
        return <div>Error</div>
    }

    const [open, setOpen] = useState('0')

    const questionLocale = useMemo(
        () => (query.locale === 'en' ? 'question_en' : 'question_fr'),
        [],
    )

    const answerLocale = useMemo(
        () => (query.locale === 'en' ? 'answer_en' : 'answer_fr'),
        [],
    )

    const toggle = id => {
        if (open === id) {
            setOpen('0')
        } else {
            setOpen(id)
        }
    }

    return (
        <Container className="mt-5">
            <h1 className="mb-4">{t('page_title')}</h1>
            <Accordion toggle={toggle} open={open}>
                {faqs?.data.map(question => (
                    <AccordionItem key={question.id}>
                        <AccordionHeader targetId={question.id.toString()}>
                            {question[questionLocale]}
                        </AccordionHeader>
                        <AccordionBody accordionId={question.id.toString()}>
                            {question[answerLocale]}
                        </AccordionBody>
                    </AccordionItem>
                ))}
            </Accordion>
        </Container>
    )
}

export { getStaticPaths }
export const getStaticProps = async ctx => {
    const faqs = await faqService.index()

    return {
        props: {
            ...(await getI18nProps(ctx, ['faq', 'navigation', 'footer'])),
            faqs,
        },
    }
}

export default Index
