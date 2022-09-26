import React, { useState, useMemo, useEffect } from 'react'
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import compareAsc from 'date-fns/compareAsc'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import addDays from 'date-fns/addDays'
import subDays from 'date-fns/subDays'
import addYears from 'date-fns/addYears'
import subMonths from 'date-fns/subMonths'
import isSaturday from 'date-fns/isSaturday'
import isSunday from 'date-fns/isSunday'
import isBefore from 'date-fns/isBefore'
import isAfter from 'date-fns/isAfter'
import parseISO from 'date-fns/parseISO'
import enUS from 'date-fns/locale/en-US'
import frCA from 'date-fns/locale/fr-CA'
import { useRouter } from 'next/router'
import { Container } from 'reactstrap'
import { useTranslation } from 'next-i18next'
import { allowedMonths } from '@/constants/reservations.constants'
import isEqual from 'date-fns/isEqual'
import addSeconds from 'date-fns/addSeconds'
import reservations from '@/pages/reservations'

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
    const [currentDate, setCurrentDate] = useState(new Date())
    const [maxNumberOfDays, setMaxNumberOfDays] = useState(4)

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
        let totalReservations = 0
        event.reservations.forEach(
            reservation =>
                (totalReservations += reservation.customer_forms.length),
        )

        return (
            <>
                <div>
                    {router.locale === 'en' ? event.title_en : event.title_fr}
                </div>
                <div>
                    {t('places_left', {
                        places_left:
                            event.max_reservations - totalReservations < 0
                                ? 0
                                : event.max_reservations - totalReservations,
                    })}
                </div>
            </>
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

    const onSelectSlot = e => {
        let daySelected = [e.slots[0]]

        // Disable selecting if the month is not allowed or if the selected day is in the past
        if (
            !allowedMonths.includes(daySelected[0].getMonth()) ||
            isBefore(daySelected[0], subDays(new Date(), 1))
        )
            return null

        // Disable selecting events with max capacity
        const selectedEvent = events.filter(event =>
            isEqual(addSeconds(daySelected[0], 1), parseISO(event.start)),
        )[0]

        if (selectedEvent) {
            let numberOfReservations = 0
            selectedEvent.reservations.forEach(
                reservation =>
                    (numberOfReservations += reservation.customer_forms.length),
            )
            if (numberOfReservations >= selectedEvent.max_reservations) {
                return null
            }
        }

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

    const onNavigate = focusDate => {
        if (
            !isAfter(focusDate, addYears(new Date(), 1)) &&
            !isBefore(focusDate, subMonths(new Date(), 3))
        ) {
            setCurrentDate(focusDate)
        }
    }

    const dayPropGetter = date => {
        if (allowedMonths.includes(date.getMonth())) {
            const selected = daysSelected.every(
                day => compareAsc(day, date) !== 0,
            )
            return {
                style: {
                    background: selected ? '' : '#C1E1C1',
                },
            }
        }
        return {
            style: {
                background: '#e6e6e6',
            },
        }
    }

    const eventPropGetter = () => {
        return {
            style: {
                background: 'transparent',
                color: 'red',
                zIndex: -1,
                pointerEvents: 'none',
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
                onSelectSlot={onSelectSlot}
                dayPropGetter={dayPropGetter}
                eventPropGetter={eventPropGetter}
                components={components}
                onNavigate={onNavigate}
                date={currentDate}
            />
        </Container>
    )
}

export default Calendar
