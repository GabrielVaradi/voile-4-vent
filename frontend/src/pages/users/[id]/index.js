import React, { useEffect, useState } from 'react'
import AppLayout from '@/components/Layouts/AppLayout'
import axios from '@/lib/axios'
import Head from 'next/head'
import { useRouter } from 'next/router'

const UserPage = () => {
    const router = useRouter()
    const { id } = router.query

    return (
        <AppLayout header={'User'}>
            <Head>
                <title>{process.env.NEXT_PUBLIC_APP_NAME} - User</title>
            </Head>
            <UserShowSection id={id} />
        </AppLayout>
    )
}

const UserShowSection = ({ id }) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        if (id) {
            axios.get(`/users/${id}`).then(({ data }) => {
                setUser(data.data)
            })
        }
    }, [id])

    return (
        <>
            {user && (
                <div className="container">
                    <div className="row mb-3">
                        <label className="col-3" htmlFor="title">
                            Name:
                        </label>
                        <div className="col-9">{user.name}</div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-3" htmlFor="description">
                            Email:
                        </label>
                        <div className="col-9">{user.email}</div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-3" htmlFor="description">
                            Created:
                        </label>
                        <div className="col-9">{user.created_at}</div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-3" htmlFor="description">
                            Last updated:
                        </label>
                        <div className="col-9">{user.updated_at}</div>
                    </div>
                </div>
            )}
        </>
    )
}

export default UserPage
