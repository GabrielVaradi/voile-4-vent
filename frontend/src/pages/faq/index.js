import React, { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import { faqService } from '../../services'
import {
    Container,
    Accordion,
    AccordionBody,
    AccordionHeader,
    AccordionItem,
} from 'reactstrap'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const Index = () => {
    const { t } = useTranslation('faq')
    const router = useRouter()

    const [faqs, setFaqs] = useState([])
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

    useEffect(() => {
        faqService.index().then(({ data }) => setFaqs(data))
    }, [])

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
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                'navigation',
                'faq',
                'footer',
            ])),
        },
    }
}

export default Index
