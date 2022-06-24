import React, { useState, useEffect } from 'react'
import { reservationService } from '../../services'
import { Container } from 'reactstrap'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Calendar from '@/components/Calendar'
import format from 'date-fns/format'

const Index = () => {
    const { t } = useTranslation('reservations')

    const events = [
        {
            start: format(new Date(), 'MM/dd/yyyy'),
            end: format(new Date(), 'MM/dd/yyyy'),
            title: 'Some title',
        },
    ]

    return (
        <Container className="mt-5">
            <div> {t('reservations')}</div>
            <Calendar events={events} className="mt-5" />
        </Container>
    )
}

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                'reservations',
                'navigation',
                'footer',
            ])),
        },
    }
}

export default Index
