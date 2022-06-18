import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import React from 'react'
import { QueryClientProvider, QueryClient, useQuery } from 'react-query'
import { userService } from '../services'
import Link from 'next/link'

const queryClient = new QueryClient()

function EventsList() {
    const { isLoading, error, data } = useQuery('repoData', () =>
        userService.getAuthUserEvents(),
    )

    if (isLoading) return <div className="p-4 text-center">Loading...</div>

    if (error) {
        return (
            <div className="p-4 text-center">{`An error has occurred: ${error.message}`}</div>
        )
    }

    const events = data.data

    if (!events.length)
        return (
            <div className="p-4 text-center">
                No events available for this user
            </div>
        )

    return (
        <QueryClientProvider client={queryClient}>
            <div className="d-flex flex-wrap justify-content-between">
                {events.map((e, i) => (
                    <div
                        className="event-card card m-2 w-25 bg-black"
                        key={`event-${i}`}>
                        <img
                            className="card-img-top"
                            src="https://images.unsplash.com/photo-1561489396-888724a1543d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                            alt="event details"
                        />
                        <div className="card-body bg-dark text-white">
                            <div className="w-100 py-4">
                                <div className="w-100 text-lg-start">
                                    <div lines={2} ellipsis="..." width={250}>
                                        {e.title}
                                    </div>
                                </div>
                                {e.address && <div>{e.address}</div>}
                            </div>
                            {e.description && (
                                <p className="card-text">
                                    <div>{e.description}</div>
                                </p>
                            )}
                        </div>
                        <div className="card-footer d-flex justify-content-end">
                            <Link href={`/events/${e.id}`}>
                                <div className="btn btn-outline-primary">
                                    Visit Event
                                </div>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </QueryClientProvider>
    )
}

const Dashboard = () => (
    <AppLayout header={'Dashboard'}>
        <Head>
            <title>{process.env.NEXT_PUBLIC_APP_NAME} - Dashboard</title>
        </Head>
        <QueryClientProvider client={queryClient}>
            <div className="card-header">My Events</div>
            <EventsList />
        </QueryClientProvider>
    </AppLayout>
)

export default Dashboard
