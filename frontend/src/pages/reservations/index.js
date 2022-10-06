import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { eventService } from '../../services'
import Select from 'react-select'
import { Container, Button } from 'reactstrap'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Calendar from '@/components/Calendar'

import styles from '../../../styles/Pages/Reservation.module.scss'
import ReservationForm from '@/components/Forms/ReservationForm'
import {
    addEventsWithSameDate,
    checkIfAllDaysAreSelected,
    resetCalendar,
} from '@/utils/reservations.utils'

const Index = () => {
    const router = useRouter()
    const { t } = useTranslation('reservations')

    const [daysSelected, setDaysSelected] = useState([])
    const [eventsSelected, setEventsSelected] = useState([])
    const [events, setEvents] = useState([])
    const [mappedEvents, setMappedEvents] = useState([])
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [type, setType] = useState({
        value: 'beginner_skipper',
        label: t('beginner_skipper_label'),
    })

    const options = [
        { value: 'beginner_skipper', label: t('beginner_skipper_label') },
        { value: 'initiation_sailing', label: t('initiation_sailing_label') },
        { value: 'spinnaker', label: t('spinnaker_label') },
    ]

    useEffect(() => {
        const type = router.query?.type
        if (type) {
            setType(options.filter(option => option.value === type)[0])
        }
    }, [router])

    // useEffect(() => {
    //     // Check to see if this is a redirect back from Checkout
    //     const query = new URLSearchParams(window.location.search)
    //     if (query.get('success')) {
    //         console.log('Order placed! You will receive an email confirmation.')
    //     }
    //
    //     if (query.get('canceled')) {
    //         console.log(
    //             'Order canceled -- continue to shop around and checkout when you’re ready.',
    //         )
    //     }
    // }, [])

    useEffect(() => {
        eventService.eventsCalendar().then(({ data }) => setEvents(data))
    }, [])

    useEffect(() => {
        if (events.length > 0) {
            const mapped = events.map(event => ({
                id: event.id,
                start: event.start,
                end: event.end,
                title_en: event.title_en,
                title_fr: event.title_fr,
                reservations: event.reservations,
                max_reservations: event.max_reservations,
            }))
            setMappedEvents(mapped)
        }
    }, [events])

    return (
        <Container className="mt-5">
            <div> {t('reservations')}</div>
            <Select
                name="type"
                id="type"
                options={options}
                onChange={option => {
                    setType(option)
                    resetCalendar(
                        setDaysSelected,
                        setEventsSelected,
                        setMappedEvents,
                    )
                }}
                value={type}
                styles={{
                    menu: base => ({ ...base, zIndex: 1000 }),
                }}
            />
            <Calendar
                className="mt-5"
                events={mappedEvents}
                daysSelected={daysSelected}
                setDaysSelected={setDaysSelected}
                type={type}
            />
            <Button
                color="danger"
                disabled={checkIfAllDaysAreSelected(daysSelected, type)}
                onClick={() => {
                    setModalIsOpen(prev => !prev)
                    addEventsWithSameDate(
                        daysSelected,
                        events,
                        setEventsSelected,
                    )
                }}>
                {t('book_now')}
            </Button>
            <ReservationForm
                daysSelected={daysSelected}
                eventsSelected={eventsSelected}
                type={type}
                router={router}
                modalIsOpen={modalIsOpen}
                setModalIsOpen={setModalIsOpen}
            />
        </Container>
    )
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
