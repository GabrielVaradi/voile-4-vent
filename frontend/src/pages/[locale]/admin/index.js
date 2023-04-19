import React, { useEffect } from 'react'
import { getStaticPaths, makeStaticProps } from '../../../lib/getStatic'
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

const getStaticProps = makeStaticProps([
    'reservations',
    'reservationForm',
    'navigation',
    'footer',
])
export { getStaticPaths, getStaticProps }

export default Index
