import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Input, Container, InputGroup } from 'reactstrap'
import { useAuth } from '@/hooks/auth'
import { ErrorMessage, Field, Form, Formik } from 'formik'

import cn from 'classnames'
import { todoService } from '@/services'
import { faTrash, faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import * as Yup from 'yup'

const Index = () => {
    const router = useRouter()
    const { t } = useTranslation('todos')
    const { user } = useAuth()

    const [todos, setTodos] = useState([])

    useEffect(() => {
        if (!user) router.push('/admin-login')
    }, [])

    useEffect(() => {
        todoService.index().then(({ data }) => setTodos(data))
    }, [])

    const todosValidation = Yup.object().shape({
        description: Yup.string().required(t('validation_required')),
    })

    const addTodo = (values, { resetForm }) => {
        todoService
            .store(values)
            .then(({ data }) => {
                const newTodos = [...todos]
                newTodos.unshift(data)
                setTodos(newTodos)
                resetForm()
            })
            .catch(e => {
                console.log(e)
                resetForm()
            })
    }

    const changeTodoStatus = todo => {
        const newTodos = todos.map(t =>
            t.id === todo.id ? { ...todo, status: !todo.status } : t,
        )
        setTodos(newTodos)
        todoService.update(todo.id, { status: !todo.status })
    }

    const deleteTodo = todo => {
        const newTodos = todos.filter(t => t.id !== todo.id)
        setTodos(newTodos)
        todoService.deleteTodo(todo.id)
    }

    return (
        <Container className="mt-5">
            <h1 className="mb-4">{t('page_title')}</h1>
            <Formik
                initialValues={{ description: '' }}
                validationSchema={todosValidation}
                onSubmit={addTodo}>
                {({ errors, touched, submitForm }) => (
                    <>
                        <Form className="d-flex align-items-center mb-5">
                            <div className="d-flex flex-column w-100">
                                <InputGroup>
                                    <Input
                                        type="text"
                                        name="description"
                                        id="description"
                                        tag={Field}
                                        required
                                        className={cn({
                                            'is-invalid':
                                                touched['description'] &&
                                                errors['description'],
                                        })}
                                        placeholder={t('todos_placeholder')}
                                    />
                                </InputGroup>
                                <ErrorMessage
                                    name="description"
                                    render={msg => (
                                        <small className="text-danger">
                                            {msg}
                                        </small>
                                    )}
                                />
                            </div>

                            <FontAwesomeIcon
                                className="ms-4"
                                type="button"
                                style={{ color: '#0b0851' }}
                                icon={faCirclePlus}
                                onClick={submitForm}
                                size="2x"
                            />
                        </Form>
                    </>
                )}
            </Formik>
            {todos.map((todo, i) => (
                <div className="d-flex justify-content-between" key={todo.id}>
                    <div
                        className={`mb-2 fs-4 ${
                            todo.status ? 'text-decoration-line-through' : ''
                        }`}>
                        {`${i + 1} - ${todo.description}`}
                    </div>
                    <div className="d-flex align-items-center justify-content-center">
                        <Input
                            type="checkbox"
                            checked={todo.status}
                            onChange={() => changeTodoStatus(todo)}
                            className="mt-0 me-4 fs-4"
                        />
                        <FontAwesomeIcon
                            type="button"
                            onClick={() => deleteTodo(todo)}
                            icon={faTrash}
                            color="red"
                            size="lg"
                        />
                    </div>
                </div>
            ))}
        </Container>
    )
}

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                'todos',
                'navigation',
                'footer',
            ])),
        },
    }
}

export default Index
