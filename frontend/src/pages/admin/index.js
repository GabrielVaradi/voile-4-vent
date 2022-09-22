import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Col, FormGroup, Button, Input, Label, Container } from 'reactstrap'
import axios from '@/lib/axios'
import AdminCalendar from '@/components/AdminCalendar'
import { useAuth } from '@/hooks/auth'
import { eventService } from '@/services'

const Index = () => {
    const router = useRouter()
    const { user } = useAuth()

    const [events, setEvents] = useState([])
    const [mappedEvents, setMappedEvents] = useState([])

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
            <AdminCalendar className="mt-5" events={mappedEvents} />
        </Container>
    )
}

export default Index
