import React, { useMemo } from 'react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GoogleMap, LoadScript } from '@react-google-maps/api'
import { Container, Row, Col, Button } from 'reactstrap'
import { Form, Formik } from 'formik'
import BasicTextInput from '@/components/Fields/BasicTextInput'
import BasicTextArea from '@/components/Fields/BasicTextArea'
import styles from '../../../styles/Pages/Contact-us.module.scss'
import * as Yup from 'yup'
import { getYear } from 'date-fns'
import { mailService } from '@/services'

const Index = () => {
    const { t } = useTranslation('contact-us')

    const defaultProps = {
        id: 1,
        description: 'ici!',
        center: {
            lat: 45.40788320621722,
            lng: -73.9168146150809,
        },
        zoom: 17,
    }

    const sendContactEmail = (values, { resetForm }) => {
        console.log(values)
        mailService.sendContactUsEmail(values).then(res => {
            console.log(res)
            resetForm()
        })
    }

    const contactUsValidations = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        subject: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        body: Yup.string()
            .min(10, 'Too Short!')
            .max(500, 'Too Long!')
            .required('Required'),
    })

    return (
        <Container className="mt-5">
            <Row>
                <Col md={6}>
                    <Formik
                        initialValues={{
                            name: '',
                            email: '',
                            subject: '',
                            body: '',
                        }}
                        validationSchema={contactUsValidations}
                        onSubmit={sendContactEmail}>
                        {({
                            errors,
                            touched,
                            isSubmitting,
                            submitForm,
                            isValid,
                        }) => (
                            <>
                                <Form>
                                    <BasicTextInput
                                        field="name"
                                        fieldLabel="Name"
                                        placeholder="Name"
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
                                        field="subject"
                                        fieldLabel="Subject"
                                        placeholder="Subject"
                                        errors={errors}
                                        touched={touched}
                                        required
                                    />
                                    <BasicTextArea
                                        fieldName="body"
                                        fieldLabel="Message"
                                        placeholder="Message"
                                        inputGroupClasses={
                                            styles.messageTextArea
                                        }
                                        errors={errors}
                                        touched={touched}
                                        required
                                    />

                                    <div className="d-flex justify-content-end">
                                        <Button
                                            color="primary"
                                            disabled={isSubmitting || !isValid}
                                            onClick={submitForm}>
                                            Login
                                        </Button>
                                    </div>
                                </Form>
                            </>
                        )}
                    </Formik>
                </Col>
                <Col md={6}>
                    <LoadScript
                        googleMapsApiKey={
                            process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
                        }>
                        <GoogleMap
                            mapContainerStyle={{
                                height: '50vh',
                                width: '100%',
                            }}
                            center={defaultProps.center}
                            zoom={defaultProps.zoom}
                        />
                    </LoadScript>
                </Col>
            </Row>
        </Container>
    )
}

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                'contactUs',
                'navigation',
                'footer',
            ])),
        },
    }
}

export default Index
