import React, { useEffect } from 'react'
import { getStaticPaths, makeStaticProps } from '../../../lib/getStatic'
import ReservationComponent from '@/components/ReservationComponent'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/auth'
import Head from 'next/head'

const Index = () => {
    const router = useRouter()
    const { user } = useAuth()

    useEffect(() => {
        if (!user) router.push('/admin-login')
    }, [])

    return (
        <>
            <Head>
                <title> Voile 4 vents admin reservations page </title>
                <meta
                    name="description"
                    content="Look and change the reservations made by the clients"
                />
            </Head>
            <ReservationComponent isAdmin />
        </>
    )
}

const getStaticProps = makeStaticProps([
    'reservations',
    'reservationForm',
    'navigation',
    'footer',
])
export { getStaticPaths, getStaticProps }

export default Index
