import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {
    Col,
    FormGroup,
    Button,
    Input,
    Label,
    Container,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    Nav,
} from 'reactstrap'
import axios from '@/lib/axios'
import AdminCalendar from '@/components/AdminCalendar'
import { useAuth } from '@/hooks/auth'
import { eventService } from '@/services'
import isEqual from 'date-fns/isEqual'
import addSeconds from 'date-fns/addSeconds'
import isSunday from 'date-fns/isSunday'
import isSaturday from 'date-fns/isSaturday'
import format from 'date-fns/format'
import addDays from 'date-fns/addDays'
import { FieldArray, Form, Formik } from 'formik'
import BasicSelect from '@/components/Fields/BasicSelect'
import * as Yup from 'yup'
import { getYear } from 'date-fns'
import BasicTextInput from '@/components/Fields/BasicTextInput'
import BasicAddressField from '@/components/Fields/BasicAddressField'
import BasicPhoneInput from '@/components/Fields/BasicPhoneInput'
import BasicDateInput from '@/components/Fields/BasicDateInput'
import ReservationForm from '@/components/Forms/ReservationForm'
import {
    addEventsWithSameDate,
    checkIfAllDaysAreSelected,
    resetCalendar,
} from '@/utils/reservations.utils'
import Select from 'react-select'

const Index = () => {
    const router = useRouter()
    const { user } = useAuth()

    const [events, setEvents] = useState([])
    const [mappedEvents, setMappedEvents] = useState([])
    const [daysSelected, setDaysSelected] = useState([])
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [eventsSelected, setEventsSelected] = useState([])
    const [type, setType] = useState({
        value: 'beginner_skipper',
        label: 'Elementaire',
    })

    const options = [
        { value: 'beginner_skipper', label: 'Elementaire' },
        { value: 'initiation_sailing', label: 'Initiation' },
        { value: 'spinnaker', label: 'Spinnaker' },
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
        <Container>
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
            <AdminCalendar
                className="mt-5"
                events={mappedEvents}
                daysSelected={daysSelected}
                setDaysSelected={setDaysSelected}
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
                Glick
            </Button>
        </Container>
    )
}

export default Index
