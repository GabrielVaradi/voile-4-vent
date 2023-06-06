import React from 'react'
import Head from 'next/head'
import ReservationComponent from '@/components/ReservationComponent'
import { getStaticPaths, makeStaticProps } from '../../../lib/getStatic'

const Index = () => (
    <>
        <Head>
            <title> Voile 4 vents reservation page </title>
            <meta
                name="description"
                content="This is where you can book your courses through our agenda"
            />
        </Head>
        <ReservationComponent />
    </>
)

const getStaticProps = makeStaticProps([
    'reservations',
    'reservationForm',
    'navigation',
    'footer',
])
export { getStaticPaths, getStaticProps }

export default Index
