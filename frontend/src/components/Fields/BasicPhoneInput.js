import React from 'react'
import { Col, FormGroup, Input, InputGroup, Label } from 'reactstrap'
import { ErrorMessage, Field } from 'formik'
import cn from 'classnames'

const BasicPhoneInput = ({
    field,
    fieldLabel,
    placeholder,
    errors,
    touched,
    required,
}) => {
    return (
        <FormGroup row>
            <Label for={field} md={2}>
                {fieldLabel}
                {required && <span className="required-asterisk">*</span>}
            </Label>
            <Col md={10}>
                <InputGroup>
                    <Input
                        type="tel"
                        name={field}
                        id={field}
                        tag={Field}
                        required
                        className={cn({
                            'is-invalid': touched[field] && errors[field],
                        })}
                        placeholder={placeholder || 'Type here...'}
                    />
                </InputGroup>
                <ErrorMessage
                    name={field}
                    render={msg => <small className="text-danger">{msg}</small>}
                />
            </Col>
        </FormGroup>
    )
}

export default BasicPhoneInput
