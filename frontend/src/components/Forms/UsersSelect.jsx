import React, { useEffect, useState } from 'react'
import { Col, FormGroup, InputGroup, Label } from 'reactstrap'
import { AsyncPaginate } from 'react-select-async-paginate'
import { ErrorMessage } from 'formik'
import { components } from 'react-select'

const Option = ({ data, ...props }) => {
    return (
        <components.Option {...props}>
            <div className="d-flex flex-column">
                <div>{data.label}</div>
                {data.email && <small>{data.email}</small>}
            </div>
        </components.Option>
    )
}

const UsersSelect = ({ event, setFieldValue, fetch }) => {
    const [eventUsers, setEventUsers] = useState([])

    useEffect(() => {
        if (event?.users && fetch) {
            const users = event.users.map(user => ({
                value: user.id,
                label: user.name,
                email: user.email,
            }))

            setEventUsers(users)
        }
    }, [event])

    // bootstrap styles
    const colourStyles = {
        control: (styles, { isFocused }) => ({
            ...styles,
            color: '#212529',
            backgroundColor: '#f8fafc',
            borderColor: isFocused ? '#86b7fe' : '#ced4da',
            outline: 0,
            boxShadow: isFocused
                ? '0 0 0 0.25rem rgb(13 110 253 / 25%)'
                : 'none',
        }),
        multiValue: styles => {
            return {
                ...styles,
                backgroundColor: 'var(--bs-primary)',
                display: 'flex',
                padding: '0.35em 0 0.35em 0.65em',
                // fontSize: '.75em',
                // fontWeight: '700',
                lineHeight: '1.1',
                color: '#fff',
                textAlign: 'center',
                whiteSpace: 'nowrap',
                verticalAlign: 'baseline',
                borderRadius: '0.25rem',
                alignItems: 'center',
                fontSize: '13px',
                fontWeight: '100',
            }
        },
        multiValueLabel: () => ({ marginBottom: '-1px' }),
        multiValueRemove: styles => ({
            ...styles,
            color: 'rgba(255, 255, 255, 0.5)',
            ':hover': {
                color: 'white',
            },
        }),
    }

    return (
        <FormGroup row>
            <Label for="users" sm={2}>
                Users
            </Label>
            <Col sm={10}>
                <ErrorMessage
                    name="users"
                    render={msg => <small className="text-danger">{msg}</small>}
                />
            </Col>
        </FormGroup>
    )
}

export default UsersSelect
