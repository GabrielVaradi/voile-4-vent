import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Container } from 'reactstrap'
import axios from '@/lib/axios'
import AdminCalendar from '@/components/AdminCalendar'
import { useAuth } from '@/hooks/auth'
import { eventService } from '@/services'
import ReservationForm from '@/components/Forms/ReservationForm'
import {
    addEventsWithSameDate,
    checkIfAllDaysAreSelected,
    resetCalendar,
} from '@/utils/reservations.utils'
import Select from 'react-select'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

const Index = () => {
    const router = useRouter()
    const { user } = useAuth()
    const { t } = useTranslation('reservations')

    const [events, setEvents] = useState([])
    const [mappedEvents, setMappedEvents] = useState([])
    const [daysSelected, setDaysSelected] = useState([])
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [eventsSelected, setEventsSelected] = useState([])
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

    useEffect(() => {
        if (!user) router.push('/admin-login')
    }, [])

    useEffect(() => {
        eventService.index().then(({ data }) => setEvents(data))
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
            <AdminCalendar
                className="mt-5"
                events={mappedEvents}
                daysSelected={daysSelected}
                setDaysSelected={setDaysSelected}
                type={type}
            />
            <ReservationForm
                eventsSelected={eventsSelected}
                daysSelected={daysSelected}
                router={router}
                modalIsOpen={modalIsOpen}
                setModalIsOpen={setModalIsOpen}
                isAdmin
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
