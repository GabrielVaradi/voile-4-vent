import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import Select from 'react-select'
import DisplayServerValidationErrors from '../../utils/DisplayValidationErrors'
import React, { useState, useEffect } from 'react'
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { userService, eventService } from '@/services'

const UserCreatePage = () => (
    <AppLayout header={'User'}>
        <Head>
            <title>{process.env.NEXT_PUBLIC_APP_NAME} - User</title>
        </Head>
        <UserCreateSection />
    </AppLayout>
)

const UserCreateSection = () => {
    const [events, setEvents] = useState([])
    const [serverValidationErrors, setServerValidationErrors] = useState(null)

    useEffect(async () => {
        eventService.index().then(({ data }) => {
            const mappedData = data.map(event => ({
                value: event.id,
                label: event.title,
            }))
            setEvents(mappedData)
        })
    }, [])

    const submitUserValues = async values => {
        setServerValidationErrors(null)

        userService
            .store(values)
            .then(({ data }) => {
                toast.success(`Profile created for ${data.data.name}`, {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                })

                setTimeout(() => {
                    window.location.href = `/users/${data.data.id}`
                }, 6000)
            })
            .catch(e => {
                setServerValidationErrors(e.response?.data?.errors)
                toast.error('Unable to create user', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                })
            })
    }

    const userCreateValidations = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().min(8, 'Min. 8 characters').required('Required'),
        password_confirmation: Yup.string().test(
            'passwords-match',
            'Passwords must match',
            function (value) {
                return this.parent.password === value
            },
        ),
    })

    return (
        <>
            <ToastContainer />
            <Formik
                initialValues={{
                    name: '',
                    email: '',
                    events: '',
                    password: '',
                    password_confirmation: '',
                }}
                onSubmit={submitUserValues}
                validationSchema={userCreateValidations}>
                {({
                    isSubmitting,
                    touched,
                    errors,
                    isValid,
                    dirty,
                    submitForm,
                    setFieldValue,
                }) => (
                    <>
                        <Form>
                            <div className="position-relative d-flex flex-column">
                                <label htmlFor="firstName">Name</label>
                                <Field
                                    className="form-control"
                                    name="name"
                                    placeholder="John Wick"
                                />
                                {errors.name && touched.name && (
                                    <div className="text-danger font-weight-bold">
                                        {errors.name}
                                    </div>
                                )}
                            </div>

                            <div className="position-relative d-flex flex-column">
                                <label
                                    className="form mt-3"
                                    htmlFor="firstName">
                                    Email
                                </label>
                                <Field
                                    className="form-control"
                                    name="email"
                                    placeholder="john@gg.com"
                                />
                                {errors.email && touched.email && (
                                    <div className="text-danger font-weight-bold">
                                        {errors.email}
                                    </div>
                                )}
                            </div>

                            <div className="position-relative d-flex flex-column">
                                <label className="mt-3" htmlFor="email">
                                    Password
                                </label>
                                <Field
                                    className="form-control"
                                    name="password"
                                    type="password"
                                />
                                {errors.password && touched.password && (
                                    <div className="text-danger font-weight-bold">
                                        {errors.password}
                                    </div>
                                )}
                            </div>

                            <div className="position-relative d-flex flex-column">
                                <label className="mt-3" htmlFor="email">
                                    Confirm Password
                                </label>
                                <Field
                                    className="form-control"
                                    name="password_confirmation"
                                    type="password"
                                />
                                {errors.password_confirmation &&
                                    touched.password_confirmation && (
                                        <div className="text-danger font-weight-bold">
                                            {errors.password_confirmation}
                                        </div>
                                    )}
                            </div>

                            {events.length ? (
                                <div className="position-relative d-flex flex-column">
                                    <label className="mt-3" htmlFor="email">
                                        Registered Events
                                    </label>
                                    <Select
                                        className="react-select"
                                        classNamePrefix="react-select"
                                        options={events}
                                        onChange={selectEvents =>
                                            setFieldValue(
                                                'events',
                                                selectEvents.map(
                                                    event => event.value,
                                                ),
                                            )
                                        }
                                        placeholder="List of existing events here"
                                        isClearable
                                        isMulti
                                    />
                                    {errors.events && touched.events && (
                                        <div className="text-danger font-weight-bold">
                                            {errors.events}
                                        </div>
                                    )}
                                </div>
                            ) : null}
                        </Form>
                        {isSubmitting && (
                            <div className="h-100 w-100 bg-light bg-opacity-10 mt-3">
                                <div
                                    className="spinner-border"
                                    role="status text-center"
                                />
                            </div>
                        )}
                        {serverValidationErrors && (
                            <DisplayServerValidationErrors
                                errors={serverValidationErrors}
                            />
                        )}
                        <button
                            className="btn btn-primary mt-3"
                            onClick={submitForm}
                            disabled={isSubmitting || !isValid || !dirty}>
                            Save
                        </button>
                    </>
                )}
            </Formik>
        </>
    )
}

export default UserCreatePage
