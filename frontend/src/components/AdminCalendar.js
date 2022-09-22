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
import { Container } from 'reactstrap'
import { useTranslation } from 'next-i18next'
import styles from '../../styles/Components/AdminCalendar.module.scss'

import('react-big-calendar/lib/css/react-big-calendar.css')

const Calendar = ({ events, className }) => {
    const router = useRouter()
    const { t } = useTranslation('reservations')

    const Event = e => {
        const event = e.event
        const customers = [
            'Gabriel Varadi',
            'Gabriel Varadi',
            'Gabriel Varadi',
            'Gabriel Varadi',
        ]
        // event.reservations.forEach(reservation =>
        //     reservation.customer_forms.forEach(form =>
        //         customers.push(`${form.first_name} ${form.last_name}`),
        //     ),
        // )

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

    const eventPropGetter = event => {
        return {
            style: {
                textAlign: 'center',
            },
        }
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
            />
        </Container>
    )
}

export default Calendar
