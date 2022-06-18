import React from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import * as Yup from 'yup'
import { Form, Formik } from 'formik'
import { Button } from 'reactstrap'
import BasicTextInput from '@/components/BasicTextInput'
import BasicTextArea from '@/components/BasicTextArea'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { eventService } from '../../services'
import UsersSelect from '@/components/Forms/UsersSelect'

const EventForm = ({ isEdit, event, eventId, setEvent }) => {
    const router = useRouter()

    const onSubmit = async (values, formikBag) => {
        const action = isEdit
            ? () => eventService.update(eventId, values)
            : () => eventService.store(values)

        action()
            .then(async ({ data }) => {
                formikBag.setSubmitting(false)
                toast.success(`Event ${values.title} saved`, {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                })

                if (isEdit) {
                    setEvent(data)
                } else {
                    await router.push(`/events/${data.id}`)
                }
            })
            .catch(e => {
                formikBag.setSubmitting(false)

                if (e.response && e.response.data) {
                    formikBag.setErrors(e.response.data.errors)
                }

                toast.error('Unable to save event', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                })

                throw e
            })
    }

    const eventEditValidations = Yup.object().shape({
        title: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        contact_email: Yup.string().email('Invalid email'),
    })

    return (
        <>
            <Formik
                initialValues={
                    isEdit
                        ? {
                              title: event.title || '',
                              description: event.description || '',
                              address: event.address || '',
                              contact_name: event.contact_name || '',
                              contact_email: event.contact_email || '',
                              users: event?.users?.map(user => user.id),
                          }
                        : {
                              title: '',
                              description: '',
                              address: '',
                              contact_name: '',
                              contact_email: '',
                              users: [],
                          }
                }
                enableReinitialize
                onSubmit={onSubmit}
                validationSchema={eventEditValidations}>
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
                            <BasicTextInput
                                field="title"
                                fieldLabel="Title"
                                placeholder="Event title"
                                errors={errors}
                                touched={touched}
                                required
                            />
                            <BasicTextArea
                                fieldName="description"
                                fieldLabel="Description"
                                placeholder="Event description"
                                errors={errors}
                                touched={touched}
                            />
                            <BasicTextInput
                                field="address"
                                fieldLabel="Address"
                                placeholder="355 Rue Ste-Catherine E"
                                errors={errors}
                                touched={touched}
                            />
                            <BasicTextInput
                                field="contact_name"
                                fieldLabel="Contact name"
                                placeholder="John Doe"
                                errors={errors}
                                touched={touched}
                            />
                            <BasicTextInput
                                field="contact_email"
                                fieldLabel="Contact email"
                                placeholder="John Doe"
                                errors={errors}
                                touched={touched}
                            />

                            <UsersSelect
                                fetch
                                event={event}
                                setFieldValue={setFieldValue}
                            />

                            <div className="d-flex justify-content-end">
                                <Button
                                    color="primary"
                                    onClick={submitForm}
                                    disabled={
                                        isSubmitting || !isValid || !dirty
                                    }>
                                    {isEdit ? 'Update' : 'Create'}
                                    {isSubmitting && (
                                        <FontAwesomeIcon
                                            icon={faCircleNotch}
                                            size="sm"
                                            spin
                                            className="ms-2"
                                        />
                                    )}
                                </Button>
                            </div>
                        </Form>
                    </>
                )}
            </Formik>
        </>
    )
}

export default EventForm
