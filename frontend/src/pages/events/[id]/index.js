import React, { useState, useEffect } from 'react'
import { eventService } from '../../../services'
import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Loader from '@/components/Loader'

const Index = () => {
    const [event, setEvent] = useState(null)
    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        if (id) {
            eventService
                .show(id)
                .then(({ data }) => {
                    setEvent(data)
                })
                .catch(({ response }) => {
                    // eslint-disable-next-line no-console
                    console.log(response)
                })
        }
    }, [id])

    return (
        <AppLayout header={event ? event.title : ''}>
            <Head>
                <title>{process.env.NEXT_PUBLIC_APP_NAME} - Event</title>
            </Head>
            {event ? (
                <div className="container">
                    <div className="row mb-3">
                        <label className="col-3" htmlFor="title">
                            Title:
                        </label>
                        <div className="col-9">{event.title}</div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-3" htmlFor="description">
                            Description:
                        </label>
                        <div className="col-9">{event.description}</div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-3" htmlFor="address">
                            Address:
                        </label>
                        <div className="col-9">{event.address}</div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-3" htmlFor="contact_name">
                            Contact name:
                        </label>
                        <div className="col-9">{event.contact_name}</div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-3" htmlFor="contact_email">
                            Contact email:
                        </label>
                        <div className="col-9">{event.contact_email}</div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-3" htmlFor="updated_at">
                            Last updated:
                        </label>
                        <div className="col-9">
                            {new Date(Date.parse(event.updated_at)).toString()}
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-3" htmlFor="created_at">
                            Created:
                        </label>
                        <div className="col-9">
                            {new Date(Date.parse(event.created_at)).toString()}
                        </div>
                    </div>
                </div>
            ) : (
                <Loader />
            )}
        </AppLayout>
    )
}

export default Index
