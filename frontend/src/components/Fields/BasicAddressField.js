import React from 'react'
import { Col, FormGroup, InputGroup, Label } from 'reactstrap'
import { ErrorMessage } from 'formik'
import cn from 'classnames'
import Autocomplete from 'react-google-autocomplete'

const BasicAddressField = ({
    field,
    fieldLabel,
    errors,
    touched,
    required,
    formGroupClasses,
    onSelect,
    options,
}) => {
    return (
        <FormGroup row className={formGroupClasses}>
            <Label for={field} md={2}>
                {fieldLabel}
                {required && <span className="required-asterisk">*</span>}
            </Label>
            <Col md={10}>
                <InputGroup>
                    <Autocomplete
                        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
                        onPlaceSelected={onSelect}
                        options={options}
                        className={cn('form-control', {
                            'is-invalid': touched[field] && errors[field],
                        })}
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

export default BasicAddressField
