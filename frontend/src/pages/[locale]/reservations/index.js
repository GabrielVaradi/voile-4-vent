import React from 'react'
import Head from 'next/head'
// import ReservationComponent from '@/components/ReservationComponent'
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

        {/* <ReservationComponent /> */}
        <div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">
            <div className="max-w-xl mx-auto sm:px-6 lg:px-8">
                <div className="flex items-center pt-8 sm:justify-start sm:pt-0">
                    <div className="px-4 text-lg text-gray-500 border-r border-gray-400 tracking-wider">
                        404
                    </div>

                    <div className="ml-4 text-lg text-gray-500 uppercase tracking-wider">
                        Not Found
                    </div>
                </div>
            </div>
        </div>
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
