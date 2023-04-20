import { useAuth } from '@/hooks/auth'
import React from 'react'
import { Button, Card, CardHeader, CardBody, Container } from 'reactstrap'
import { Form, Formik } from 'formik'
import BasicTextInput from '@/components/Fields/BasicTextInput'
import BasicPasswordInput from '@/components/Fields/BasicPasswordInput'
import { getStaticPaths, makeStaticProps } from '../../../lib/getStatic'
import * as Yup from 'yup'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
// import Reaptcha from 'reaptcha'
// import { useRouter } from 'next/router'

const Index = () => {
    const { t } = useTranslation('adminLogin')
    // const recaptchaRef = useRef()
    // const { query } = useRouter()

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
        <>
            <Head>
                <title> Voile 4 vents admin login page </title>
                <meta
                    name="description"
                    content="Login to the admin side of the website"
                />
            </Head>
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
                                            placeholder={t(
                                                'password_placeholder',
                                            )}
                                            errors={errors}
                                            touched={touched}
                                            required
                                        />
                                        <div className="d-flex justify-content-end">
                                            <Button
                                                color="primary"
                                                disabled={
                                                    isSubmitting || !isValid
                                                }
                                                onClick={() => {
                                                    // recaptchaRef.current.execute()
                                                    submitForm()
                                                }}>
                                                {t('login')}
                                            </Button>
                                            {/*<Reaptcha*/}
                                            {/*    sitekey={*/}
                                            {/*        process.env*/}
                                            {/*            .NEXT_PUBLIC_GOOGLE_RECAPTCHA_PUBLIC_KEY*/}
                                            {/*    }*/}
                                            {/*    ref={e =>*/}
                                            {/*        (recaptchaRef.current = e)*/}
                                            {/*    }*/}
                                            {/*    size="invisible"*/}
                                            {/*    hl={query.locale}*/}
                                            {/*/>*/}
                                        </div>
                                    </Form>
                                </>
                            )}
                        </Formik>
                    </CardBody>
                </Card>
            </Container>
        </>
    )
}

const getStaticProps = makeStaticProps(['adminLogin', 'navigation', 'footer'])
export { getStaticPaths, getStaticProps }

export default Index
