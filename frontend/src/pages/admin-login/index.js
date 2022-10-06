import { useAuth } from '@/hooks/auth'
import React from 'react'
import { Button, Card, CardHeader, CardBody, Container } from 'reactstrap'
import { Form, Formik } from 'formik'
import BasicTextInput from '@/components/Fields/BasicTextInput'
import BasicPasswordInput from '@/components/Fields/BasicPasswordInput'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import * as Yup from 'yup'
import { useTranslation } from 'next-i18next'

const Index = () => {
    const { t } = useTranslation('adminLogin')
    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/admin',
    })

    const submitLogin = (values, { resetForm }) => {
        const { email, password } = values
        login({
            email,
            password,
        })
        resetForm()
    }

    const adminLoginValidation = Yup.object().shape({
        email: Yup.string()
            .email(t('validation_email_invalid'))
            .required(t('validation_required')),
        password: Yup.string().required(t('validation_required')),
    })

    return (
        <Container className="mt-5 d-flex justify-content-center">
            <Card className="w-75">
                <CardHeader>{t('login')}</CardHeader>
                <CardBody>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={adminLoginValidation}
                        onSubmit={submitLogin}>
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
                                        field="email"
                                        fieldLabel={t('email_label')}
                                        placeholder={t('email_placeholder')}
                                        errors={errors}
                                        touched={touched}
                                        required
                                    />
                                    <BasicPasswordInput
                                        field="password"
                                        fieldLabel={t('password_label')}
                                        placeholder={t('password_placeholder')}
                                        errors={errors}
                                        touched={touched}
                                        required
                                    />
                                    <div className="d-flex justify-content-end">
                                        {/*    <div className="flex items-center justify-end mt-4">*/}
                                        {/*        <Link href="/forgot-password">*/}
                                        {/*            <a className="underline text-sm text-gray-600 hover:text-gray-900">*/}
                                        {/*                Forgot your password?*/}
                                        {/*            </a>*/}
                                        {/*        </Link>*/}
                                        <Button
                                            color="primary"
                                            disabled={isSubmitting || !isValid}
                                            onClick={submitForm}>
                                            {t('login')}
                                        </Button>
                                    </div>
                                </Form>
                            </>
                        )}
                    </Formik>
                </CardBody>
            </Card>
        </Container>
    )
}

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                'adminLogin',
                'navigation',
                'footer',
            ])),
        },
    }
}

export default Index
