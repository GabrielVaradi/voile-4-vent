import React, { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import {
    Button,
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
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

const Index = () => {
    const router = useRouter()
    const { user } = useAuth()
    const { t } = useTranslation('allowedSkippers')

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [allowedSkippers, setAllowedSkippers] = useState([])
    const [datatableLoading, setDatatableLoading] = useState(false)
    const [totalRows, setTotalRows] = useState(0)
    const [perPage, setPerPage] = useState(10)

    const paginationComponentOptions = useMemo(
        () => ({
            rowsPerPageText: t('rows_per_page'),
            rangeSeparatorText: t('range_separator'),
            selectAllRowsItem: true,
            selectAllRowsItemText: t('select_all_rows'),
        }),
        [],
    )

    useEffect(() => {
        if (!user) router.push('/admin-login')
    }, [])

    useEffect(() => {
        fetchAllowedSkippers(1)
    }, [])

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const allowedSkipperFormValidations = Yup.object().shape({
        first_name: Yup.string()
            .min(2, t('validation_too_short'))
            .max(50, t('validation_too_long'))
            .required(t('validation_required')),
        last_name: Yup.string()
            .min(2, t('validation_too_short'))
            .max(50, t('validation_too_long'))
            .required(t('validation_required')),

        email: Yup.string()
            .email(t('validation_email_invalid'))
            .required(t('validation_required')),
        phone_number: Yup.string()
            .matches(phoneRegExp, t('validation_phone_number_invalid'))
            .required(t('validation_required')),
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
            name: t('row_first_name'),
            selector: row => row.first_name,
        },
        {
            name: t('row_last_name'),
            selector: row => row.last_name,
        },
        {
            name: t('row_email'),
            selector: row => row.email,
        },
        {
            name: t('row_phone_number'),
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
        <Container className="d-flex flex-column mt-5">
            <h1 className="mb-4">{t('page_title')}</h1>
            <DataTable
                columns={columns}
                data={allowedSkippers}
                progressPending={datatableLoading}
                pagination
                paginationServer
                paginationTotalRows={totalRows}
                onChangeRowsPerPage={handlePerRowsChange}
                onChangePage={handlePageChange}
                paginationComponentOptions={paginationComponentOptions}
            />
            <div className="w-100 d-flex justify-content-end">
                <Button
                    color="primary"
                    className="mt-3 fs-4"
                    onClick={() => {
                        setModalIsOpen(prev => !prev)
                    }}>
                    {t('add')}
                </Button>
            </div>

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
                                {t('add_allowed_skipper')}
                            </ModalHeader>
                            <ModalBody>
                                <>
                                    <Form>
                                        <BasicTextInput
                                            field="first_name"
                                            fieldLabel={t('first_name_label')}
                                            placeholder={t(
                                                'first_name_placeholder',
                                            )}
                                            errors={errors}
                                            touched={touched}
                                            required
                                        />
                                        <BasicTextInput
                                            field="last_name"
                                            fieldLabel={t('last_name_label')}
                                            placeholder={t(
                                                'last_name_placeholder',
                                            )}
                                            errors={errors}
                                            touched={touched}
                                            required
                                        />
                                        <BasicTextInput
                                            field="email"
                                            fieldLabel={t('email_label')}
                                            placeholder={t('email_placeholder')}
                                            errors={errors}
                                            touched={touched}
                                            required
                                        />
                                        <BasicPhoneInput
                                            field="phone_number"
                                            fieldLabel={t('phone_number_label')}
                                            placeholder={t(
                                                'phone_number_placeholder',
                                            )}
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
                                    {t('add')}
                                </Button>
                                <Button
                                    color="secondary"
                                    onClick={() => toggleModal(resetForm)}>
                                    {t('cancel')}
                                </Button>
                            </ModalFooter>
                        </Modal>
                    )
                }}
            </Formik>
        </Container>
    )
}

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                'allowedSkippers',
                'navigation',
                'footer',
            ])),
        },
    }
}

export default Index
