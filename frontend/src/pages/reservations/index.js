import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import {
    reservationService,
    eventService,
    courseService,
    stripeService,
} from '../../services'
import Select from 'react-select'
import {
    Container,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Label,
    FormGroup,
    Input,
    Col,
    InputGroup,
    Nav,
    NavItem,
    NavLink,
    TabPane,
    TabContent,
    Row,
} from 'reactstrap'
import Script from 'next/script'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Calendar from '@/components/Calendar'
import Autocomplete from 'react-google-autocomplete'
import { ErrorMessage, Field, Form, Formik, FieldArray } from 'formik'
import * as Yup from 'yup'
import BasicTextInput from '@/components/Fields/BasicTextInput'
import BasicPhoneInput from '@/components/Fields/BasicPhoneInput'
import BasicSelect from '@/components/Fields/BasicSelect'
import BasicAddressField from '@/components/Fields/BasicAddressField'
import BasicDateInput from '@/components/Fields/BasicDateInput'
import format from 'date-fns/format'
import { getYear, parseISO } from 'date-fns'
import cn from 'classnames'
import isEqual from 'date-fns/isEqual'
import addSeconds from 'date-fns/addSeconds'
import compareAsc from 'date-fns/compareAsc'
import teacherService from '@/services/teacher.service'
import isSaturday from 'date-fns/isSaturday'
import addDays from 'date-fns/addDays'
import isSunday from 'date-fns/isSunday'

import styles from '../../../styles/Pages/Reservation.module.scss'
import ReservationForm from '@/components/Forms/ReservationForm'
import {
    addEventsWithSameDate,
    checkIfAllDaysAreSelected,
    resetCalendar,
} from '@/utils/reservations.utils'

const Index = () => {
    const [daysSelected, setDaysSelected] = useState([])
    const [eventsSelected, setEventsSelected] = useState([])
    const [events, setEvents] = useState([])
    const [mappedEvents, setMappedEvents] = useState([])
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [type, setType] = useState({
        value: 'beginner_skipper',
        label: 'Elementaire',
    })

    const options = [
        { value: 'beginner_skipper', label: 'Elementaire' },
        { value: 'initiation_sailing', label: 'Initiation' },
        { value: 'spinnaker', label: 'Spinnaker' },
    ]

    const router = useRouter()
    const { t } = useTranslation('reservations')

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
                Glick
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
                'navigation',
                'footer',
            ])),
        },
    }
}

export default Index
