import React, { useState, useEffect } from 'react'
import { reservationService, eventService, courseService } from '../../services'
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
import format from 'date-fns/format'
import { parseISO } from 'date-fns'
import cn from 'classnames'

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
                    first_name: '',
                    last_name: '',
                    email: '',
                    address: '',
                    phone_number: '',
                    birthdate: '',
                    payment: '',
                    number_of_people: '',
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
                                    <FormGroup row>
                                        <Label for="payment" sm={2}>
                                            Payment
                                            <span className="required-asterisk">
                                                *
                                            </span>
                                        </Label>
                                        <Col sm={10}>
                                            <InputGroup>
                                                <Input
                                                    type="select"
                                                    name="payment"
                                                    id="payment"
                                                    required
                                                    // tag={Field}
                                                    className={cn({
                                                        'is-invalid':
                                                            touched.payment &&
                                                            errors.payment,
                                                    })}>
                                                    <option>Full</option>
                                                    <option>Deposit</option>
                                                </Input>
                                            </InputGroup>
                                            <ErrorMessage
                                                name="payment"
                                                render={msg => (
                                                    <small className="text-danger">
                                                        {msg}
                                                    </small>
                                                )}
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="number_of_people" sm={2}>
                                            Number of people
                                            <span className="required-asterisk">
                                                *
                                            </span>
                                        </Label>
                                        <Col sm={10}>
                                            <InputGroup>
                                                <Input
                                                    type="select"
                                                    name="number_of_people"
                                                    id="number_of_people"
                                                    required
                                                    // tag={Field}
                                                    className={cn({
                                                        'is-invalid':
                                                            touched.number_of_people &&
                                                            errors.number_of_people,
                                                    })}>
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                </Input>
                                            </InputGroup>
                                            <ErrorMessage
                                                name="number_of_people"
                                                render={msg => (
                                                    <small className="text-danger">
                                                        {msg}
                                                    </small>
                                                )}
                                            />
                                        </Col>
                                    </FormGroup>
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
