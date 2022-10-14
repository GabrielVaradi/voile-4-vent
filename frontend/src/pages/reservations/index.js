import React from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import ReservationComponent from '@/components/ReservationComponent'

const Index = () => <ReservationComponent />

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                'reservations',
                'reservationForm',
                'navigation',
                'footer',
            ])),
        },
    }
}

export default Index
