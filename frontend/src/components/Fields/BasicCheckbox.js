import React from 'react'
import { Col, FormGroup, Input, InputGroup, Label } from 'reactstrap'
import { ErrorMessage, Field } from 'formik'
import cn from 'classnames'

const BasicCheckbox = ({
    field,
    fieldLabel,
    errors,
    touched,
    required,
    labelClasses,
    labelRole,
    labelOnClick,
}) => {
    return (
        <FormGroup row className="align-items-center">
            <Label className="d-flex" for={field} lg={11}>
                <div
                    role={labelRole}
                    className={labelClasses}
                    onClick={e => {
                        e.preventDefault()
                        labelOnClick()
                    }}>
                    {fieldLabel}
                </div>
                {required && <span className="required-asterisk">*</span>}
            </Label>
            <Col lg={1}>
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
                    />
                </InputGroup>
            </Col>
            <ErrorMessage
                name={field}
                render={msg => <small className="text-danger">{msg}</small>}
            />
        </FormGroup>
    )
}

export default BasicCheckbox
