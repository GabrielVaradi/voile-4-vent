import React from 'react'
import { Col, FormGroup, Input, InputGroup, Label } from 'reactstrap'
import { ErrorMessage, Field } from 'formik'
import cn from 'classnames'

const BasicCheckbox = ({
    field,
    fieldLabel,
    placeholder,
    errors,
    touched,
    required,
}) => {
    return (
        <FormGroup row className="align-items-center">
            <Label for={field} lg={4}>
                {fieldLabel}
                {required && <span className="required-asterisk">*</span>}
            </Label>
            <Col lg={2}>
                <InputGroup>
                    <Input
                        type="checkbox"
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

export default BasicCheckbox
