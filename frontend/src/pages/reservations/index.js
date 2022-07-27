import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import {
    reservationService,
    eventService,
    courseService,
    stripeService,
} from '../../services'
import {
    Container,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Label,
    FormGroup,
    Input,
    Col,
    InputGroup,
} from 'reactstrap'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Calendar from '@/components/Calendar'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import BasicTextInput from '@/components/BasicTextInput'
import BasicSelect from '@/components/BasicSelect'
import format from 'date-fns/format'
import { parseISO } from 'date-fns'
import cn from 'classnames'
import isEqual from 'date-fns/isEqual'
import addSeconds from 'date-fns/addSeconds'
import compareAsc from 'date-fns/compareAsc'

const Index = () => {
    const [daysSelected, setDaysSelected] = useState([])
    const [eventsSelected, setEventsSelected] = useState([])
    const [events, setEvents] = useState([])
    const [mappedEvents, setMappedEvents] = useState([])
    const [modalIsOpen, setModalIsOpen] = useState(false)

    const router = useRouter()
    const { t } = useTranslation('reservations')

    // useEffect(() => {
    //     // Check to see if this is a redirect back from Checkout
    //     const query = new URLSearchParams(window.location.search)
    //     if (query.get('success')) {
    //         console.log('Order placed! You will receive an email confirmation.')
    //     }
    //
    //     if (query.get('canceled')) {
    //         console.log(
    //             'Order canceled -- continue to shop around and checkout when you’re ready.',
    //         )
    //     }
    // }, [])

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

    // const userEditValidations = Yup.object().shape({
    //     name: Yup.string()
    //         .min(2, 'Too Short!')
    //         .max(50, 'Too Long!')
    //         .required('Required'),
    //     email: Yup.string().email('Invalid email').required('Required'),
    // })

    const createReservation = async (values, { resetForm }) => {
        let filteredDays = [...daysSelected]
        if (eventsSelected.length === 0) {
            filteredDays = daysSelected.map(day => addSeconds(day, 1))
        } else {
            daysSelected.forEach((day, i) => {
                for (const event of eventsSelected) {
                    if (
                        isEqual(addSeconds(day, 1), new Date(event.start)) ||
                        isEqual(addSeconds(day, 1), new Date(event.end))
                    ) {
                        delete filteredDays[i]
                    }
                }
            })
        }

        const formattedDates = filteredDays
            .filter(n => n)
            .map(n => format(new Date(n), 'yyyy-MM-dd HH-mm-ss'))

        const newEventsData = {
            dates: formattedDates,
            reservations: values.number_of_people,
        }

        const eventsSelectedIds = eventsSelected.map(event => event.id)

        const newValues = {
            ...values,
            events: eventsSelectedIds,
            eventsData: newEventsData,
            language: router.locale,
        }
        stripeService.createCheckoutSession(newValues).then(res => {
            router.push(res.url)
        })

        // if (newEventsData.dates.length > 0) {
        //     eventService
        //         .store(newEventsData)
        //         .then(
        //             ({ data }) =>
        //                 (newValues.events = newValues.events.concat(data)),
        //         )
        //         .then(() => {
        //             reservationService
        //                 .store(newValues)
        //                 .then(() => setModalIsOpen(false))
        //         })
        // } else {
        //     reservationService
        //         .store(newValues)
        //         .then(() => setModalIsOpen(false))
        // }
        // eventService.store(newEventsData).then(res => console.log(res))
        // reservationService.store(values).then(() => setModalIsOpen(false))
        // axios
        //     .post(`users/${user?.id}`, values)
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

    const addEventsWithSameDate = () => {
        const newEvents = []
        daysSelected.forEach(daySelect => {
            events.forEach(event => {
                if (
                    isEqual(addSeconds(daySelect, 1), new Date(event.start)) ||
                    isEqual(addSeconds(daySelect, 1), new Date(event.end))
                ) {
                    newEvents.push(event)
                }
            })
        })
        setEventsSelected(
            newEvents.filter(
                (v, i, a) => a.findIndex(v2 => v2.id === v.id) === i,
            ),
        )
    }

    return (
        <Container className="mt-5">
            <div> {t('reservations')}</div>
            <Calendar
                className="mt-5"
                events={mappedEvents}
                daysSelected={daysSelected}
                setDaysSelected={setDaysSelected}
            />
            <Button
                color="danger"
                onClick={() => {
                    setModalIsOpen(prev => !prev)
                    addEventsWithSameDate()
                }}>
                Glick
            </Button>
            <Formik
                onSubmit={createReservation}
                initialValues={{
                    first_name: 'd23',
                    last_name: 'd',
                    email: 'd@d.com',
                    address: 'd',
                    phone_number: '123',
                    birthdate: '123',
                    payment: 'Full ',
                    number_of_people: '1',
                    type: 'beginner_skipper',
                }}
                // validationSchema={userEditValidations}
                enableReinitialize>
                {({
                    isSubmitting,
                    touched,
                    errors,
                    isValid,
                    submitForm,
                    setFieldValue,
                }) => (
                    <Modal
                        isOpen={modalIsOpen}
                        toggle={() => setModalIsOpen(prev => !prev)}
                        size="lg">
                        <ModalHeader
                            toggle={() => setModalIsOpen(prev => !prev)}>
                            Modal title
                        </ModalHeader>
                        <ModalBody>
                            <>
                                <Form>
                                    <BasicTextInput
                                        field="first_name"
                                        fieldLabel="First name"
                                        placeholder="First name"
                                        errors={errors}
                                        touched={touched}
                                        required
                                    />
                                    <BasicTextInput
                                        field="last_name"
                                        fieldLabel="Last name"
                                        placeholder="Last name"
                                        errors={errors}
                                        touched={touched}
                                        required
                                    />
                                    <BasicTextInput
                                        field="email"
                                        fieldLabel="Email"
                                        placeholder="Email"
                                        errors={errors}
                                        touched={touched}
                                        required
                                    />
                                    <BasicTextInput
                                        field="address"
                                        fieldLabel="Address"
                                        placeholder="Address"
                                        errors={errors}
                                        touched={touched}
                                        required
                                    />
                                    <BasicTextInput
                                        field="phone_number"
                                        fieldLabel="Phone Number"
                                        placeholder="Phone Number"
                                        errors={errors}
                                        touched={touched}
                                        required
                                    />
                                    <BasicTextInput
                                        field="birthdate"
                                        fieldLabel="Birthdate"
                                        placeholder="Birthdate"
                                        errors={errors}
                                        touched={touched}
                                        required
                                    />
                                    <BasicSelect
                                        field="payment"
                                        fieldLabel="Payment"
                                        errors={errors}
                                        touched={touched}
                                        setFieldValue={setFieldValue}
                                        required>
                                        <option>Full</option>
                                        <option>Deposit</option>
                                    </BasicSelect>
                                    <BasicSelect
                                        field="number_of_people"
                                        fieldLabel="Number of people"
                                        errors={errors}
                                        touched={touched}
                                        setFieldValue={setFieldValue}
                                        required>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                    </BasicSelect>
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
                                disabled={isSubmitting || !isValid}
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
