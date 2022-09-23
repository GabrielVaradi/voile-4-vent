import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {
    Col,
    FormGroup,
    Button,
    Input,
    Label,
    Container,
    InputGroup,
} from 'reactstrap'
import { useAuth } from '@/hooks/auth'
import { ErrorMessage, Field, Form, Formik } from 'formik'

import cn from 'classnames'
import { todoService } from '@/services'

const Index = () => {
    const router = useRouter()
    const { user } = useAuth()

    const [todos, setTodos] = useState([])

    useEffect(() => {
        if (!user) router.push('/admin-login')
    }, [])

    useEffect(() => {
        todoService.index().then(({ data }) => setTodos(data))
    }, [])

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
            <Formik
                initialValues={{ description: '' }}
                // validationSchema={}
                onSubmit={addTodo}>
                {({ errors, touched, isSubmitting, submitForm, isValid }) => (
                    <>
                        <Form className="d-flex 123 mb-5">
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
                                    placeholder="Todo"
                                />
                            </InputGroup>
                            <ErrorMessage
                                name="description"
                                render={msg => (
                                    <small className="text-danger">{msg}</small>
                                )}
                            />
                            <Button
                                className="ms-4"
                                color="primary"
                                disabled={isSubmitting || !isValid}
                                onClick={submitForm}>
                                Add
                            </Button>
                        </Form>
                    </>
                )}
            </Formik>
            {todos.map(todo => (
                <div className="d-flex justify-content-between" key={todo.id}>
                    <div
                        className={
                            todo.status ? 'text-decoration-line-through' : ''
                        }>
                        {todo.description}
                    </div>
                    <div>
                        <Input
                            type="checkbox"
                            checked={todo.status}
                            onChange={() => changeTodoStatus(todo)}
                        />
                        <Button color="danger" onClick={() => deleteTodo(todo)}>
                            Delete
                        </Button>
                    </div>
                </div>
            ))}
        </Container>
    )
}

export default Index
