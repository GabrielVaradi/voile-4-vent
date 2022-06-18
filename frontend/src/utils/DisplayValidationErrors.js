import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { Alert } from 'reactstrap'

const DisplayServerValidationErrors = ({ errors }) => {
    return (
        <Alert color="danger" className="mt-3 mb-0">
            <FontAwesomeIcon icon={faExclamationTriangle} className="me-1" />
            Please correct the following errors:
            <ul className="mb-0">
                {Object.entries(errors).map(([field, fieldErrors]) => (
                    <li key={`field-${field}`}>
                        <span className="text-capitalize">{field}</span>
                        <ul>
                            {fieldErrors.map((fieldError, index) => (
                                <li key={`field-error-${index}`}>
                                    {fieldError}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </Alert>
    )
}

export default DisplayServerValidationErrors
