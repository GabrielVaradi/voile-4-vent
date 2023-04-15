import React from 'react'
import { Col, FormGroup, Input, Label } from 'reactstrap'
import { ErrorMessage, Field } from 'formik'
import cn from 'classnames'

const BasicDateInput = ({
    field,
    dayField,
    monthField,
    yearField,
    fieldLabel,
    dayPlaceholder,
    monthPlaceholder,
    yearPlaceholder,
    errors,
    touched,
    required,
}) => {
    return (
        <FormGroup row>
            <Label for={field} lg={2}>
                {fieldLabel}
                {required && <span className="required-asterisk">*</span>}
            </Label>
            <Col lg={5} className="d-flex">
                <div className="me-2">
                    <Input
                        type="number"
                        name={dayField}
                        id={dayField}
                        tag={Field}
                        required
                        className={cn({
                            'is-invalid': touched[dayField] && errors[dayField],
                        })}
                        placeholder={dayPlaceholder}
                    />
                    <ErrorMessage
                        name={dayField}
                        render={msg => (
                            <small className="text-danger">{msg}</small>
                        )}
                    />
                </div>

                <div className="me-2">
                    <Input
                        type="number"
                        name={monthField}
                        id={monthField}
                        tag={Field}
                        required
                        className={cn({
                            'is-invalid':
                                touched[monthField] && errors[monthField],
                        })}
                        placeholder={monthPlaceholder}
                    />
                    <ErrorMessage
                        name={monthField}
                        render={msg => (
                            <small className="text-danger">{msg}</small>
                        )}
                    />
                </div>
                <div>
                    <Input
                        type="number"
                        name={yearField}
                        id={yearField}
                        tag={Field}
                        required
                        className={cn({
                            'is-invalid':
                                touched[yearField] && errors[yearField],
                        })}
                        placeholder={yearPlaceholder}
                    />
                    <ErrorMessage
                        name={yearField}
                        render={msg => (
                            <small className="text-danger">{msg}</small>
                        )}
                    />
                </div>
            </Col>
        </FormGroup>
    )
}

export default BasicDateInput
