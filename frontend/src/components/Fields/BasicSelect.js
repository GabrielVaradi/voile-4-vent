import React from 'react'
import { Col, FormGroup, Input, InputGroup, Label } from 'reactstrap'
import { ErrorMessage } from 'formik'
import cn from 'classnames'

const BasicSelect = ({
    field,
    fieldLabel,
    errors,
    touched,
    required,
    setFieldValue,
    children,
    formGroupClasses,
    onSelect,
}) => {
    return (
        <FormGroup row className={formGroupClasses}>
            <Label for={field} lg={2}>
                {fieldLabel}
                {required && <span className="required-asterisk">*</span>}
            </Label>
            <Col lg={10}>
                <InputGroup>
                    <Input
                        type="select"
                        name={field}
                        id={field}
                        onChange={e =>
                            onSelect
                                ? onSelect(e)
                                : setFieldValue(field, e.target.value)
                        }
                        required
                        className={cn({
                            'is-invalid': touched[field] && errors[field],
                        })}>
                        {children}
                    </Input>
                </InputGroup>
                <ErrorMessage
                    name={field}
                    render={msg => <small className="text-danger">{msg}</small>}
                />
            </Col>
        </FormGroup>
    )
}

export default BasicSelect
