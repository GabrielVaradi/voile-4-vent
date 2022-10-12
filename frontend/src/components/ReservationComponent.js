import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { eventService } from '../services'
import Select from 'react-select'
import { Container, Button } from 'reactstrap'
import { useTranslation } from 'next-i18next'
import Calendar from '@/components/Calendar'

import styles from '../../styles/Pages/Reservation.module.scss'
import ReservationForm from '@/components/Forms/ReservationForm'
import {
    addEventsWithSameDate,
    checkIfAllDaysAreSelected,
    resetCalendar,
} from '@/utils/reservations.utils'
import AdminCalendar from '@/components/AdminCalendar'
import Link from 'next/link'
import Reaptcha from 'reaptcha'

const ReservationComponent = ({ isAdmin }) => {
    const router = useRouter()
    const { t } = useTranslation('reservations')
    const recaptchaRef = useRef()

    const [daysSelected, setDaysSelected] = useState([])
    const [eventsSelected, setEventsSelected] = useState([])
    const [events, setEvents] = useState([])
    const [mappedEvents, setMappedEvents] = useState([])
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [type, setType] = useState({
        value: 'beginner_skipper',
        label: t('beginner_skipper_label'),
        days: 4,
    })

    const options = [
        {
            value: 'beginner_skipper',
            label: t('beginner_skipper_label'),
            days: 4,
        },
        {
            value: 'initiation_sailing',
            label: t('initiation_sailing_label'),
            days: 2,
        },
        { value: 'spinnaker', label: t('spinnaker_label'), days: 1 },
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
        const action = isAdmin
            ? eventService.index()
            : eventService.eventsCalendar()
        action.then(({ data }) => setEvents(data))
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
                    resetCalendar(setDaysSelected, setEventsSelected)
                }}
                value={type}
                styles={{
                    menu: base => ({ ...base, zIndex: 1000 }),
                }}
            />
            <ul className="mt-4">
                <li>
                    {t('helper_text_select_days', {
                        count: type.days,
                        days: type.days,
                    })}
                </li>
                <li>
                    {t('helper_text_contact_us_description_1')}
                    <Link href={`/contact-us`}>
                        <a>{t('helper_text_contact_us_link')}</a>
                    </Link>
                    {t('helper_text_contact_us_description_2')}
                </li>
            </ul>
            {isAdmin ? (
                <AdminCalendar
                    events={mappedEvents}
                    daysSelected={daysSelected}
                    setDaysSelected={setDaysSelected}
                    type={type}
                />
            ) : (
                <Calendar
                    events={mappedEvents}
                    daysSelected={daysSelected}
                    setDaysSelected={setDaysSelected}
                    type={type}
                />
            )}

            <Button
                color="primary"
                className="mt-5 w-100"
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
                isAdmin={isAdmin}
                recaptchaRef={recaptchaRef}
            />
            <Reaptcha
                sitekey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_PUBLIC_KEY}
                ref={e => (recaptchaRef.current = e)}
                size="invisible"
                hl={router.locale}
            />
        </Container>
    )
}

export default ReservationComponent
