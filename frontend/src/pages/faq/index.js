import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { faqService } from '../../services'
import {
    Container,
    UncontrolledAccordion,
    AccordionBody,
    AccordionHeader,
    AccordionItem,
} from 'reactstrap'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const Index = () => {
    const [faqs, setFaqs] = useState([])
    const { t } = useTranslation('faq')
    const router = useRouter()

    useEffect(() => {
        faqService.index().then(({ data }) => setFaqs(data))
    }, [])

    return (
        <Container className="mt-5">
            <UncontrolledAccordion defaultOpen="0" open="0">
                {faqs.map(question => (
                    <AccordionItem key={question.id}>
                        <AccordionHeader targetId={question.id}>
                            {router.locale === 'en'
                                ? question.question_en
                                : question.question_fr}
                        </AccordionHeader>
                        <AccordionBody accordionId={question.id}>
                            {router.locale === 'en'
                                ? question.answer_en
                                : question.answer_fr}
                        </AccordionBody>
                    </AccordionItem>
                ))}
            </UncontrolledAccordion>
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
