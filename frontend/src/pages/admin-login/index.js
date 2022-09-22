import { useAuth } from '@/hooks/auth'
import React from 'react'
import { Button, Card, CardHeader, CardBody, Container } from 'reactstrap'
import { Form, Formik } from 'formik'
import BasicTextInput from '@/components/BasicTextInput'
import BasicPasswordInput from '@/components/BasicPasswordInput'

const Index = () => {
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

    return (
        <Container className="mt-5 d-flex justify-content-center">
            <Card className="w-75">
                <CardHeader>Login</CardHeader>
                <CardBody>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        // validationSchema={}
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
                                        fieldLabel="Email"
                                        placeholder="Email"
                                        errors={errors}
                                        touched={touched}
                                        required
                                    />
                                    <BasicPasswordInput
                                        field="password"
                                        fieldLabel="Password"
                                        placeholder="Password"
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
                                            Login
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

export default Index
