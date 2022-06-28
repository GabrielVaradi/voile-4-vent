import React, { useState, useEffect } from 'react'
import { reservationService, eventService, courseService } from '../../services'
import {
    Container,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from 'reactstrap'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Calendar from '@/components/Calendar'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import format from 'date-fns/format'
import { parseISO } from 'date-fns'

const Index = () => {
    const [daysSelected, setDaysSelected] = useState([])
    const [events, setEvents] = useState([])
    const [mappedEvents, setMappedEvents] = useState([])
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const { t } = useTranslation('reservations')

    useEffect(() => {
        eventService.index().then(({ data }) => setEvents(data))
    }, [])

    useEffect(() => {
        if (events.length > 0) {
            const mapped = events.map(event => ({
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

    const userEditValidations = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
    })

    const createReservation = async (values, { resetForm }) => {
        console.log('hi')
        console.log(values)
        console.log(daysSelected)
        reservationService.store(values).then(() => setModalIsOpen(false))
        // axios
        //     .put(`users/${user?.id}`, values)
        //     .then(({ data }) => {
        //         setUser(data.data)
        //         toast.success(`Profile updated for ${data.name}`, {
        //             position: 'top-right',
        //             autoClose: 5000,
        //             hideProgressBar: false,
        //             closeOnClick: true,
        //             pauseOnHover: true,
        //             draggable: true,
        //         })
        //     })
        //     .catch(({ response }) => {
        //         resetForm()
        //         toast.error('Unable to update user', {
        //             position: 'top-right',
        //             autoClose: 5000,
        //             hideProgressBar: false,
        //             closeOnClick: true,
        //             pauseOnHover: true,
        //             draggable: true,
        //         })
        //     })
    }

    return (
        <Container className="mt-5">
            <div> {t('reservations')}</div>
            <Calendar
                events={mappedEvents}
                daysSelected={daysSelected}
                setDaysSelected={setDaysSelected}
                className="mt-5"
            />
            <Button
                color="danger"
                onClick={() => setModalIsOpen(prev => !prev)}>
                Glick
            </Button>
            <Formik
                onSubmit={createReservation}
                initialValues={{
                    name: '',
                    email: '',
                }}
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
                    <Modal
                        isOpen={modalIsOpen}
                        toggle={() => setModalIsOpen(prev => !prev)}>
                        <ModalHeader
                            toggle={() => setModalIsOpen(prev => !prev)}>
                            Modal title
                        </ModalHeader>
                        <ModalBody>
                            <>
                                <Form>
                                    <div className="position-relative d-flex flex-column">
                                        <label htmlFor="firstName">Name</label>
                                        <Field
                                            className="form-control"
                                            name="name"
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
                                        />
                                        {errors.email && touched.email && (
                                            <div className="text-danger font-weight-bold">
                                                {errors.email}
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
                            </>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color="primary"
                                disabled={isSubmitting || !isValid || !dirty}
                                onClick={submitForm}>
                                Rezervatiosns
                            </Button>
                            <Button
                                color="secondary"
                                onClick={() => setModalIsOpen(prev => !prev)}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Modal>
                )}
            </Formik>
        </Container>
    )
}

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                'reservations',
                'navigation',
                'footer',
            ])),
        },
    }
}

export default Index
