import React, { useState, useEffect } from 'react'
import AppLayout from '@/components/Layouts/AppLayout'
import EventForm from '@/components/Forms/EventForm'
import Loader from '@/components/Loader'
import { eventService } from '@/services'
import Head from 'next/head'
import { useRouter } from 'next/router'

const Edit = () => {
    const [event, setEvent] = useState([])
    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        if (id) {
            eventService.show(id).then(({ data }) => {
                setEvent(data)
            })
        }
    }, [id])

    return (
        <AppLayout header={event ? `${event.title} info` : ''}>
            <Head>
                <title>
                    {process.env.NEXT_PUBLIC_APP_NAME} -{' '}
                    {event ? `Edit ${event.title} info` : 'Edit event'}
                </title>
            </Head>
            {event ? (
                <EventForm
                    isEdit
                    event={event}
                    eventId={id}
                    setEvent={setEvent}
                />
            ) : (
                <Loader />
            )}
        </AppLayout>
    )
}

export default Edit
