import React from 'react'
import { Col, FormGroup, Input, InputGroup, Label } from 'reactstrap'
import { ErrorMessage, Field } from 'formik'
import cn from 'classnames'

const BasicTextArea = ({
    fieldName,
    fieldLabel,
    placeholder,
    errors,
    touched,
    required,
}) => {
    return (
        <FormGroup row>
            <Label for={fieldName} sm={2}>
                {fieldLabel}{' '}
                {required && <span className="required-asterisk">*</span>}
            </Label>
            <Col sm={10}>
                <InputGroup>
                    <Field name={fieldName}>
                        {({ field }) => (
                            <Input
                                id={fieldName}
                                name={fieldName}
                                type="textarea"
                                className={cn({
                                    'is-invalid':
                                        touched[fieldName] && errors[fieldName],
                                })}
                                placeholder={placeholder}
                                value={field.value || ''}
                                onChange={field.onChange}
                            />
                        )}
                    </Field>
                </InputGroup>
                <ErrorMessage
                    name="description"
                    render={msg => <small className="text-danger">{msg}</small>}
                />
            </Col>
        </FormGroup>
    )
}

export default BasicTextArea
