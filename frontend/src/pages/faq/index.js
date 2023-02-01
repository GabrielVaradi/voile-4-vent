import React, { useState, useMemo } from 'react'
import { useRouter } from 'next/router'
import {
    Container,
    Accordion,
    AccordionBody,
    AccordionHeader,
    AccordionItem,
} from 'reactstrap'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import axios from '@/lib/axios'

const Index = ({ faqs }) => {
    const { t } = useTranslation('faq')
    const router = useRouter()

    if (!router.isFallback && !faqs) {
        return <div>Error</div>
    }

    const [open, setOpen] = useState('0')

    const questionLocale = useMemo(
        () => (router.locale === 'en' ? 'question_en' : 'question_fr'),
        [],
    )

    const answerLocale = useMemo(
        () => (router.locale === 'en' ? 'answer_en' : 'answer_fr'),
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
                {faqs.map(question => (
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

export async function getStaticProps({ locale }) {
    const faqs = await axios.get('/faqs')
    return {
        props: {
            faqs: faqs.data.data,
            ...(await serverSideTranslations(locale, [
                'navigation',
                'faq',
                'footer',
            ])),
        },
    }
}

export default Index
