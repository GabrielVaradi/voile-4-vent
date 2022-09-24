import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {
    Col,
    FormGroup,
    Button,
    Input,
    Label,
    Container,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap'
import { useAuth } from '@/hooks/auth'
import { Form, Formik } from 'formik'
import BasicTextInput from '@/components/Fields/BasicTextInput'
import BasicPhoneInput from '@/components/Fields/BasicPhoneInput'
import * as Yup from 'yup'
import { allowedSkipperService } from '@/services'
import DataTable from 'react-data-table-component'

const Index = () => {
    const router = useRouter()
    const { user } = useAuth()

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [allowedSkippers, setAllowedSkippers] = useState([])
    const [datatableLoading, setDatatableLoading] = useState(false)
    const [totalRows, setTotalRows] = useState(0)
    const [perPage, setPerPage] = useState(10)

    useEffect(() => {
        if (!user) router.push('/admin-login')
    }, [])

    useEffect(() => {
        fetchAllowedSkippers(1)
    }, [])

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const allowedSkipperFormValidations = Yup.object().shape({
        first_name: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        last_name: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),

        email: Yup.string().email('Invalid email').required('Required'),
        phone_number: Yup.string()
            .matches(phoneRegExp, 'Phone number is not valid')
            .required('Required'),
    })

    const toggleModal = resetForm => {
        setModalIsOpen(prev => !prev)
        resetForm()
    }

    const fetchAllowedSkippers = (page, per_page = perPage) => {
        setDatatableLoading(true)
        allowedSkipperService.datatable(page, per_page).then(res => {
            setAllowedSkippers(res.data)
            setTotalRows(res.meta.total)
            setDatatableLoading(false)
        })
    }

    const handlePageChange = page => {
        fetchAllowedSkippers(page)
    }

    const handlePerRowsChange = async (newPerPage, page) => {
        setDatatableLoading(true)
        fetchAllowedSkippers(page, newPerPage)
        setPerPage(newPerPage)
        setDatatableLoading(false)
    }

    const columns = [
        {
            name: 'First name',
            selector: row => row.first_name,
        },
        {
            name: 'Last name',
            selector: row => row.last_name,
        },
        {
            name: 'Email',
            selector: row => row.email,
        },
        {
            name: 'Phone number',
            selector: row => row.phone_number,
        },
    ]

    const createAllowedSkipper = (values, { resetForm }) => {
        allowedSkipperService.store(values).then(({ data }) => {
            const newAllowedSkippers = [...allowedSkippers]
            newAllowedSkippers.unshift(data)
            setAllowedSkippers(newAllowedSkippers)
            setModalIsOpen(false)
            resetForm()
        })
    }

    return (
        <Container className="mt-5">
            <DataTable
                columns={columns}
                data={allowedSkippers}
                progressPending={datatableLoading}
                pagination
                paginationServer
                paginationTotalRows={totalRows}
                onChangeRowsPerPage={handlePerRowsChange}
                onChangePage={handlePageChange}
            />
            <Button
                color="danger"
                onClick={() => {
                    setModalIsOpen(prev => !prev)
                }}>
                Glick
            </Button>
            <Formik
                onSubmit={createAllowedSkipper}
                initialValues={{
                    first_name: '',
                    last_name: '',
                    email: '',
                    phone_number: '',
                }}
                validationSchema={allowedSkipperFormValidations}
                enableReinitialize>
                {({ isSubmitting, touched, errors, submitForm, resetForm }) => {
                    return (
                        <Modal
                            isOpen={modalIsOpen}
                            toggle={() => toggleModal(resetForm)}
                            size="lg">
                            <ModalHeader toggle={() => toggleModal(resetForm)}>
                                Titre du cours
                            </ModalHeader>
                            <ModalBody>
                                <>
                                    <Form>
                                        <BasicTextInput
                                            field="first_name"
                                            fieldLabel="First name"
                                            placeholder="First name"
                                            errors={errors}
                                            touched={touched}
                                            required
                                        />
                                        <BasicTextInput
                                            field="last_name"
                                            fieldLabel="Last name"
                                            placeholder="Last name"
                                            errors={errors}
                                            touched={touched}
                                            required
                                        />
                                        <BasicTextInput
                                            field="email"
                                            fieldLabel="Email"
                                            placeholder="Email"
                                            errors={errors}
                                            touched={touched}
                                            required
                                        />
                                        <BasicPhoneInput
                                            field="phone_number"
                                            fieldLabel="Phone Number"
                                            placeholder="Phone Number"
                                            errors={errors}
                                            touched={touched}
                                            required
                                        />
                                    </Form>
                                    {isSubmitting && (
                                        <div className="h-100 w-100 bg-light bg-opacity-10 mt-3">
                                            <div
                                                className="spinner-border"
                                                role="status text-center"
                                            />
                                        </div>
                                    )}
                                </>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="primary"
                                    disabled={isSubmitting}
                                    onClick={submitForm}>
                                    Rezervatiosns
                                </Button>
                                <Button
                                    color="secondary"
                                    onClick={() => toggleModal(resetForm)}>
                                    Cancel
                                </Button>
                            </ModalFooter>
                        </Modal>
                    )
                }}
            </Formik>
        </Container>
    )
}

export default Index
