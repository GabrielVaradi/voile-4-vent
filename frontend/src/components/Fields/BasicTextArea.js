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
            {fieldLabel && (
                <Label for={fieldName} md={2}>
                    {fieldLabel}
                    {required && <span className="required-asterisk">*</span>}
                </Label>
            )}
            <Col md={10}>
                <InputGroup>
                    <Field name={fieldName}>
                        {({ field }) => (
                            <Input
                                id={field.name}
                                name={field.name}
                                type="textarea"
                                className={cn({
                                    'is-invalid':
                                        touched[field.name] &&
                                        errors[field.name],
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
