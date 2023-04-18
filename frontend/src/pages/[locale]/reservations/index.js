import React from 'react'
import ReservationComponent from '@/components/ReservationComponent'
import { getStaticPaths, makeStaticProps } from '../../../lib/getStatic'

const Index = () => <ReservationComponent />

const getStaticProps = makeStaticProps([
    'reservations',
    'reservationForm',
    'navigation',
    'footer',
])
export { getStaticPaths, getStaticProps }

export default Index
