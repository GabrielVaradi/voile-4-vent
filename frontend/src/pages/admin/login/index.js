import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Col, FormGroup, Button, Input, Label } from 'reactstrap'
import axios from '@/lib/axios'

const Login = () => {
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    useEffect(() => {
        if (router.query.reset?.length > 0 && errors.length === 0) {
            setStatus(atob(router.query.reset))
        } else {
            setStatus(null)
        }
    })

    const submitForm = async event => {
        event.preventDefault()
        axios
            .post('/admin/login', {
                email: '',
                password: '',
            })
            .then(res => router.push('/admin'))

        // login({ email, password, setErrors, setStatus })
    }

    return (
        <form onSubmit={submitForm}>
            {/* Email Address */}
            <FormGroup row>
                <Label htmlFor="email" className={'col-md-4 text-md-end'}>
                    Email Address
                </Label>

                <Col md={6}>
                    <Input
                        id="email"
                        type="email"
                        value={email}
                        className="form-control"
                        onChange={event => setEmail(event.target.value)}
                        // required
                        autoFocus
                        autoComplete="email"
                        placeholder="mon cher"
                    />
                </Col>
            </FormGroup>

            {/* Password */}
            <FormGroup row>
                <Label htmlFor="password" className={'col-md-4 text-md-end'}>
                    Password
                </Label>

                <Col md={6}>
                    <Input
                        name="password"
                        id="password"
                        type="password"
                        value={password}
                        className="form-control"
                        onChange={event => setPassword(event.target.value)}
                        // required
                        autoComplete="current-password"
                    />
                </Col>
            </FormGroup>

            {/* Remember Me */}
            {/*<FormGroup row>*/}
            {/*    <Col sm={{ size: 10, offset: 4 }}>*/}
            {/*        <Label>*/}
            {/*            <Input*/}
            {/*                id="remember_me"*/}
            {/*                type="checkbox"*/}
            {/*                name="remember"*/}
            {/*                className="form-check-input"*/}
            {/*            />{' '}*/}
            {/*            Remember Me*/}
            {/*        </Label>*/}
            {/*    </Col>*/}
            {/*</FormGroup>*/}
            <FormGroup row>
                <Col sm={{ size: 10, offset: 4 }}>
                    <Button color="primary">Login</Button>

                    {/*<Link href="/forgot-password">*/}
                    {/*    <a className="ms-3">Forgot your password?</a>*/}
                    {/*</Link>*/}
                </Col>
            </FormGroup>
        </form>
    )
}

export default Login
