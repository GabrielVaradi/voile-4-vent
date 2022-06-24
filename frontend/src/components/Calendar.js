import React from 'react'
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import frCA from 'date-fns/locale/fr-CA'
import { useRouter } from 'next/router'
import { Container } from 'reactstrap'
import('react-big-calendar/lib/css/react-big-calendar.css')
import('../../styles/Components/Calendar.module.scss')

const Calendar = ({ events, className }) => {
    const router = useRouter()

    const locales = {
        en: enUS,
        fr: frCA,
    }

    const localizer = dateFnsLocalizer({
        format,
        parse,
        startOfWeek,
        getDay,
        locales,
    })

    return (
        <Container className="mt-5">
            <BigCalendar
                events={events}
                localizer={localizer}
                style={{ height: 500 }}
                culture={router.locale}
                views={['month']}
                className={className}
            />
        </Container>
    )
}

export default Calendar
