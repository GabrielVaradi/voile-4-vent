import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import axios from '@/lib/axios'
import DisplayServerValidationErrors from './../../../utils/DisplayValidationErrors'
import { useRouter } from 'next/router'

const UserEditPage = () => {
    const [user, setUser] = useState(null)
    const [serverValidationErrors, setServerValidationErrors] = useState(null)
    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        if (id) {
            axios.get(`/users/${id}`).then(({ data }) => {
                setUser(data.data)
            })
        }
    }, [id])

    const userEditValidations = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().min(8, 'Min. 8 characters'),
        password_confirmation: Yup.string().test(
            'passwords-match',
            'Passwords must match',
            function (value) {
                return this.parent.password === value
            },
        ),
    })

    const editProfile = async (values, { resetForm }) => {
        setServerValidationErrors(null)
        axios
            .put(`users/${user?.id}`, values)
            .then(({ data }) => {
                setUser(data.data)
                resetForm()
                toast.success(`Profile updated for ${data.name}`, {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                })
            })
            .catch(({ response }) => {
                setServerValidationErrors(response.data.errors)
                resetForm()
                toast.error('Unable to update user', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                })
            })
    }

    return (
        <AppLayout header={` info`}>
            <Head>
                <title>
                    {process.env.NEXT_PUBLIC_APP_NAME} - Edit user info
                </title>
            </Head>
            <ToastContainer />
            <Formik
                initialValues={{
                    name: user?.name || '',
                    email: user?.email || '',
                    password: '',
                    password_confirmation: '',
                }}
                onSubmit={editProfile}
                validationSchema={userEditValidations}
                enableReinitialize>
                {({
                    isSubmitting,
                    touched,
                    errors,
                    isValid,
                    dirty,
                    submitForm,
                }) => (
                    <>
                        <Form>
                            <div className="position-relative d-flex flex-column">
                                <label htmlFor="firstName">Name</label>
                                <Field className="form-control" name="name" />
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
                                <Field className="form-control" name="email" />
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
                            Update
                        </button>
                    </>
                )}
            </Formik>
        </AppLayout>
    )
}

export default UserEditPage
