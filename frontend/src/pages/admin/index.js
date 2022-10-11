import React, { useEffect } from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import ReservationComponent from '@/components/ReservationComponent'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/auth'

const Index = () => {
    const router = useRouter()
    const { user } = useAuth()

    useEffect(() => {
        if (!user) router.push('/admin-login')
    }, [])

    return <ReservationComponent isAdmin />
}

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
