import React from 'react'
import AppLayout from '@/components/Layouts/AppLayout'
import EventForm from '@/components/Forms/EventForm'
import Head from 'next/head'

const Create = () => {
    return (
        <AppLayout header={'Create event'}>
            <Head>
                <title>{process.env.NEXT_PUBLIC_APP_NAME} - Create event</title>
            </Head>
            <EventForm />
        </AppLayout>
    )
}

export default Create
