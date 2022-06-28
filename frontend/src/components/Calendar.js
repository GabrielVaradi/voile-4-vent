import React, { useState, useMemo } from 'react'
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import compareAsc from 'date-fns/compareAsc'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import addDays from 'date-fns/addDays'
import subDays from 'date-fns/subDays'
import enUS from 'date-fns/locale/en-US'
import frCA from 'date-fns/locale/fr-CA'
import { useRouter } from 'next/router'
import { Container } from 'reactstrap'
import { useTranslation } from 'next-i18next'
import('react-big-calendar/lib/css/react-big-calendar.css')
import('../../styles/Components/Calendar.module.scss')

const Calendar = ({ events, className, daysSelected, setDaysSelected }) => {
    const router = useRouter()
    const { t } = useTranslation('reservations')

    const Event = e => {
        return (
            <>
                <div>
                    {router.locale === 'en'
                        ? e.event.title_en
                        : e.event.title_fr}
                </div>
                <div>
                    {t('places_left', {
                        places_left:
                            e.event.max_reservations - e.event.reservations,
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
        if (getDay(daySelected[0]) === 6) {
            daySelected = [daySelected[0], addDays(daySelected[0], 1)]
        } else if (getDay(daySelected[0]) === 0) {
            daySelected = [daySelected[0], subDays(daySelected[0], 1)]
        }
        let days = []
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
            if (daysSelected.length + daySelected.length > 4) {
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

    const eventPropGetter = event => {
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
                onSelectEvent={onSelectSlot}
                dayPropGetter={dayPropGetter}
                eventPropGetter={eventPropGetter}
                components={components}
            />
        </Container>
    )
}

export default Calendar
