import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {
    Col,
    FormGroup,
    Button,
    Input,
    Label,
    Container,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap'
import axios from '@/lib/axios'
import { useAuth } from '@/hooks/auth'
import { Form, Formik } from 'formik'
import BasicTextInput from '@/components/Fields/BasicTextInput'
import BasicPhoneInput from '@/components/Fields/BasicPhoneInput'
import * as Yup from 'yup'
import { allowedSkipperService } from '@/services'

const Index = () => {
    const router = useRouter()
    const { user } = useAuth()

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [allowedSkippers, setAllowedSkippers] = useState([])

    useEffect(() => {
        if (!user) router.push('/admin-login')
    }, [])

    useEffect(() => {
        allowedSkipperService
            .index()
            .then(({ data }) => setAllowedSkippers(data))
    }, [])

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const allowedSkipperFormValidations = Yup.object().shape({
        forms: Yup.array().of(
            Yup.object().shape({
                first_name: Yup.string()
                    .min(2, 'Too Short!')
                    .max(50, 'Too Long!')
                    .required('Required'),
                last_name: Yup.string()
                    .min(2, 'Too Short!')
                    .max(50, 'Too Long!')
                    .required('Required'),

                email: Yup.string().email('Invalid email').required('Required'),
                phone_number: Yup.string()
                    .matches(phoneRegExp, 'Phone number is not valid')
                    .required('Required'),
            }),
        ),
    })

    const toggleModal = resetForm => {
        setModalIsOpen(prev => !prev)
        resetForm()
    }

    const createAllowedSkipper = (values, { resetForm }) => {
        allowedSkipperService.store(values)
    }

    return (
        <Container>
            <Button
                color="danger"
                onClick={() => {
                    setModalIsOpen(prev => !prev)
                }}>
                Glick
            </Button>
            <Formik
                onSubmit={createAllowedSkipper}
                initialValues={{
                    first_name: '',
                    last_name: '',
                    email: '',
                    phone_number: '',
                }}
                validationSchema={allowedSkipperFormValidations}
                enableReinitialize>
                {({
                    isSubmitting,
                    touched,
                    errors,
                    isValid,
                    submitForm,
                    resetForm,
                }) => {
                    return (
                        <Modal
                            isOpen={modalIsOpen}
                            toggle={() => toggleModal(resetForm)}
                            size="lg">
                            <ModalHeader toggle={() => toggleModal(resetForm)}>
                                Titre du cours
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
                                        <BasicPhoneInput
                                            field="phone_number"
                                            fieldLabel="Phone Number"
                                            placeholder="Phone Number"
                                            errors={errors}
                                            touched={touched}
                                            required
                                        />
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
                                    onClick={() => toggleModal(resetForm)}>
                                    Cancel
                                </Button>
                            </ModalFooter>
                        </Modal>
                    )
                }}
            </Formik>
        </Container>
    )
}

export default Index
