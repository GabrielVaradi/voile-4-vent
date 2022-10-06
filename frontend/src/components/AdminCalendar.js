import React, { useState, useMemo, useEffect } from 'react'
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import compareAsc from 'date-fns/compareAsc'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import addDays from 'date-fns/addDays'
import subDays from 'date-fns/subDays'
import isSaturday from 'date-fns/isSaturday'
import isSunday from 'date-fns/isSunday'
import enUS from 'date-fns/locale/en-US'
import frCA from 'date-fns/locale/fr-CA'
import { useRouter } from 'next/router'
import {
    Button,
    Container,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Col,
    Row,
} from 'reactstrap'
import { useTranslation } from 'next-i18next'
import styles from '../../styles/Components/AdminCalendar.module.scss'
import { FieldArray, Form } from 'formik'
import BasicSelect from '@/components/Fields/BasicSelect'

import('react-big-calendar/lib/css/react-big-calendar.css')

const Calendar = ({
    events,
    className,
    daysSelected,
    setDaysSelected,
    type,
}) => {
    const router = useRouter()
    const { t } = useTranslation('reservations')

    const [selectedEvent, setSelectedEvent] = useState(null)
    const [eventModalIsOpen, setEventModalIsOpen] = useState(false)
    const [maxNumberOfDays, setMaxNumberOfDays] = useState(4)

    const { messages, formats } = useMemo(
        () => ({
            messages: {
                previous: t('previous'),
                next: t('next'),
                today: t('today'),
            },
            formats: {
                monthHeaderFormat: (date, culture, localizer) => {
                    const string = localizer.format(date, `MMMM yyyy`, culture)
                    return string.charAt(0).toUpperCase() + string.slice(1)
                },
            },
        }),
        [],
    )

    useEffect(() => {
        if (type?.value === 'beginner_skipper') {
            setMaxNumberOfDays(4)
        } else if (type?.value === 'initiation_sailing') {
            setMaxNumberOfDays(2)
        }
        if (type?.value === 'spinnaker') {
            setMaxNumberOfDays(1)
        }
    }, [type])

    const Event = e => {
        const event = e.event

        const customers = []
        event.reservations.forEach(reservation =>
            reservation.customer_forms.forEach(form =>
                customers.push(`${form.first_name} ${form.last_name}`),
            ),
        )

        return (
            <div className="d-flex flex-column align-items-start">
                <div className="d-flex flex-wrap">
                    {customers.map((customer, i) => (
                        <div
                            key={i}
                            className={`me-2 ${styles.eventCustomers}`}>
                            {customer}
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    const components = useMemo(() => {
        return {
            event: Event,
        }
    }, [])

    const locales = {
        en: enUS,
        fr: frCA,
    }

    const localizer = dateFnsLocalizer({
        format,
        parse,
        startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
        getDay,
        locales,
    })

    const eventPropGetter = () => {
        return {
            style: {
                textAlign: 'center',
            },
        }
    }

    const onSelectSlot = e => {
        let daySelected = [e.slots[0]]
        // If the day selected is a weekend day, add the other weekend day to the array
        if (isSaturday(daySelected[0])) {
            daySelected = [daySelected[0], addDays(daySelected[0], 1)]
        } else if (isSunday(daySelected[0])) {
            daySelected = [daySelected[0], subDays(daySelected[0], 1)]
        }
        let days = []

        // Remove the day if it was already selected
        if (daySelected.length > 1) {
            days = daysSelected.filter(
                day => compareAsc(day, daySelected[0]) !== 0,
            )
            days = days.filter(day => compareAsc(day, daySelected[1]) !== 0)
        } else {
            days = daysSelected.filter(
                day => compareAsc(day, daySelected[0]) !== 0,
            )
        }
        if (days.length === daysSelected.length) {
            if (daysSelected.length + daySelected.length > maxNumberOfDays) {
                return null
            }
            setDaysSelected(prev => prev.concat(daySelected))
        } else {
            setDaysSelected(days)
        }
    }

    const dayPropGetter = date => {
        const selected = daysSelected.every(day => compareAsc(day, date) !== 0)
        return {
            style: {
                background: selected ? '' : '#C1E1C1',
            },
        }
    }

    const toggleModal = () => {
        setEventModalIsOpen(prev => !prev)
    }

    return (
        <Container className="mt-5">
            <BigCalendar
                events={events}
                className={className}
                localizer={localizer}
                style={{ height: 500 }}
                culture={router.locale}
                views={['month']}
                selectable
                eventPropGetter={eventPropGetter}
                components={components}
                onSelectEvent={e => {
                    setSelectedEvent(e)
                    setEventModalIsOpen(true)
                }}
                onSelectSlot={onSelectSlot}
                dayPropGetter={dayPropGetter}
                messages={messages}
                formats={formats}
            />
            {selectedEvent && (
                <Modal isOpen={eventModalIsOpen} toggle={toggleModal} size="lg">
                    <ModalHeader toggle={toggleModal}>
                        {selectedEvent.title_en}
                    </ModalHeader>
                    <ModalBody>
                        <Row>
                            {selectedEvent.reservations.map(reservation => (
                                <Col key={reservation.id}>
                                    <div>{reservation.type}</div>
                                    <Row>
                                        {reservation.customer_forms.map(
                                            customerForm => {
                                                const {
                                                    id,
                                                    first_name,
                                                    last_name,
                                                    email,
                                                    phone_number,
                                                    address,
                                                    birthdate,
                                                } = customerForm
                                                return (
                                                    <Col key={id}>
                                                        <div>{first_name}</div>
                                                        <div>{last_name}</div>
                                                        <div>{email}</div>
                                                        <div>
                                                            {phone_number}
                                                        </div>
                                                        <div>{address}</div>
                                                        <div>{birthdate}</div>
                                                    </Col>
                                                )
                                            },
                                        )}
                                    </Row>
                                </Col>
                            ))}
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        {/*<Button*/}
                        {/*    color="primary"*/}
                        {/*    disabled={isSubmitting}*/}
                        {/*    onClick={submitForm}>*/}
                        {/*    Rezervatiosns*/}
                        {/*</Button>*/}
                    </ModalFooter>
                </Modal>
            )}
        </Container>
    )
}

export default Calendar
