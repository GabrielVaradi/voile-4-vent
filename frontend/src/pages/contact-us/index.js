import React, { useState, useMemo } from 'react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'
import {
    Container,
    Row,
    Col,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
} from 'reactstrap'
import { Form, Formik } from 'formik'
import BasicTextInput from '@/components/Fields/BasicTextInput'
import BasicTextArea from '@/components/Fields/BasicTextArea'
import styles from '../../../styles/Pages/Contact-us.module.scss'
import * as Yup from 'yup'
import { mailService } from '@/services'
// import { useRouter } from 'next/router'
// import Reaptcha from 'reaptcha'

const Index = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const { t } = useTranslation('contactUs')
    // const router = useRouter()
    // const recaptchaRef = useRef()

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    })

    const { center, zoom, markerPosition } = useMemo(
        () => ({
            center: {
                lat: 45.40788320621722,
                lng: -73.9168146150809,
            },
            zoom: 17,
            markerPosition: {
                lat: 45.40768,
                lng: -73.91684,
            },
        }),
        [],
    )

    const sendContactEmail = (values, { resetForm }) => {
        mailService.sendContactUsEmail(values).then(() => {
            resetForm()
            setModalIsOpen(true)
        })
    }

    const contactUsValidations = Yup.object().shape({
        name: Yup.string()
            .min(2, t('validation_too_short'))
            .max(50, t('validation_too_long'))
            .required(t('validation_required')),
        email: Yup.string()
            .email(t('validation_email_invalid'))
            .required(t('validation_required')),
        subject: Yup.string()
            .min(2, t('validation_too_short'))
            .max(50, t('validation_too_long'))
            .required(t('validation_required')),
        body: Yup.string()
            .min(10, t('validation_body_too_short'))
            .max(500, t('validation_body_too_long'))
            .required(t('validation_required')),
    })

    return (
        <>
            <Container className="mt-5">
                <h1 className="mb-4">{t('page_title')}</h1>
                <div className="d-flex flex-column justify-content-center align-items-center mb-4">
                    <h5>{t('contact_us_phone_number')}</h5>
                    <h5>{t('contact_us_email')}</h5>
                    <h5>{t('contact_us_address_1')}</h5>
                    <h5>{t('contact_us_address_2')}</h5>
                </div>
                <Row>
                    <Col lg={6}>
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
                                            fieldLabel={t('name_label')}
                                            placeholder={t('name_placeholder')}
                                            errors={errors}
                                            touched={touched}
                                            required
                                        />
                                        <BasicTextInput
                                            field="email"
                                            fieldLabel={t('email_label')}
                                            placeholder={t('email_placeholder')}
                                            errors={errors}
                                            touched={touched}
                                            required
                                        />
                                        <BasicTextInput
                                            field="subject"
                                            fieldLabel={t('subject_label')}
                                            placeholder={t(
                                                'subject_placeholder',
                                            )}
                                            errors={errors}
                                            touched={touched}
                                            required
                                        />
                                        <BasicTextArea
                                            fieldName="body"
                                            fieldLabel={t('body_label')}
                                            placeholder={t('body_placeholder')}
                                            inputGroupClasses={
                                                styles.messageTextArea
                                            }
                                            errors={errors}
                                            touched={touched}
                                            required
                                        />
                                        <div className="w-100 d-flex justify-content-end">
                                            <Button
                                                className="mt-3"
                                                color="primary"
                                                disabled={
                                                    isSubmitting || !isValid
                                                }
                                                onClick={() => {
                                                    // recaptchaRef.current.execute()
                                                    submitForm()
                                                }}>
                                                {t('send_button')}
                                            </Button>
                                        </div>

                                        {/*<Reaptcha*/}
                                        {/*    sitekey={*/}
                                        {/*        process.env*/}
                                        {/*            .NEXT_PUBLIC_GOOGLE_RECAPTCHA_PUBLIC_KEY*/}
                                        {/*    }*/}
                                        {/*    ref={e => (recaptchaRef.current = e)}*/}
                                        {/*    size="invisible"*/}
                                        {/*    hl={router.locale}*/}
                                        {/*/>*/}
                                    </Form>
                                </>
                            )}
                        </Formik>
                    </Col>
                    {isLoaded && (
                        <Col lg={6}>
                            <GoogleMap
                                mapContainerStyle={{
                                    height: '50vh',
                                    width: '100%',
                                }}
                                center={center}
                                zoom={zoom}>
                                <Marker
                                    position={markerPosition}
                                    clickable={false}
                                />
                            </GoogleMap>
                        </Col>
                    )}
                </Row>
            </Container>
            <Modal
                centered
                isOpen={modalIsOpen}
                toggle={() => setModalIsOpen(prev => !prev)}
                size="lg">
                <ModalHeader toggle={() => setModalIsOpen(prev => !prev)}>
                    {t('message_sent_success_title')}
                </ModalHeader>
                <ModalBody className="h4 my-3">
                    {t('message_sent_success_description')}
                </ModalBody>
            </Modal>
        </>
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
