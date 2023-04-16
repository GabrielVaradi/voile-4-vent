import React, { useState, useEffect } from 'react'
import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
} from 'reactstrap'
import { FieldArray, Form, Formik } from 'formik'
import { stripeService, eventService } from '@/services/index'
import addSeconds from 'date-fns/addSeconds'
import isEqual from 'date-fns/isEqual'
import isSunday from 'date-fns/isSunday'
import isSaturday from 'date-fns/isSaturday'
import format from 'date-fns/format'
import addDays from 'date-fns/addDays'
import * as Yup from 'yup'
import { getYear } from 'date-fns'
import BasicSelect from '@/components/Fields/BasicSelect'
import BasicTextInput from '@/components/Fields/BasicTextInput'
import BasicAddressField from '@/components/Fields/BasicAddressField'
import BasicPhoneInput from '@/components/Fields/BasicPhoneInput'
import BasicDateInput from '@/components/Fields/BasicDateInput'
import BasicCheckbox from '@/components/Fields/BasicCheckbox'
import { useTranslation } from 'next-i18next'

const ReservationForm = ({
    eventsSelected,
    daysSelected,
    type,
    router,
    modalIsOpen,
    setModalIsOpen,
    isAdmin,
    // recaptchaRef,
}) => {
    const { t } = useTranslation('reservationForm')

    const [activeTab, setActiveTab] = useState(1)
    const [maxNumberOfPeopleOptions, setMaxNumberOfPeopleOptions] = useState(4)

    useEffect(() => {
        if (!isAdmin) {
            let maxNumberOfPeople = maxNumberOfPeopleOptions
            if (eventsSelected.length === 0) {
                maxNumberOfPeople = 4
            } else {
                eventsSelected.forEach(event => {
                    let customers = 0
                    event.reservations.forEach(reservation => {
                        customers += reservation.customer_forms.length
                    })
                    const placesRemaining = event.max_reservations - customers
                    maxNumberOfPeople = placesRemaining
                })
            }

            setMaxNumberOfPeopleOptions(maxNumberOfPeople)
        }
    }, [eventsSelected])

    const createReservation = (values, { resetForm }) => {
        let filteredDays = [...daysSelected]

        // Remove from selected days if the event already exists
        if (eventsSelected.length === 0) {
            filteredDays = daysSelected.map(day => addSeconds(day, 1))
        } else {
            daysSelected.forEach((day, i) => {
                for (const event of eventsSelected) {
                    if (
                        isEqual(addSeconds(day, 1), new Date(event.start)) ||
                        isEqual(addSeconds(day, 1), new Date(event.end))
                    ) {
                        delete filteredDays[i]
                    }
                }
            })
        }

        // Filter out empty values, remove sundays and format time
        const formattedDates = filteredDays
            .filter(day => day)
            .filter(day => !isSunday(day))
            .map(day => {
                if (isSaturday(day)) {
                    return {
                        start: format(new Date(day), 'yyyy-MM-dd HH-mm-ss'),
                        end: format(
                            new Date(addDays(day, 1)),
                            'yyyy-MM-dd HH-mm-ss',
                        ),
                    }
                } else {
                    return {
                        start: format(new Date(day), 'yyyy-MM-dd HH-mm-ss'),
                        end: format(new Date(day), 'yyyy-MM-dd HH-mm-ss'),
                    }
                }
            })

        const eventsSelectedIds = eventsSelected.map(event => event.id)

        values.forms.forEach(form => {
            form.birthdate = `${form.birthdate.day.toString()}/${form.birthdate.month.toString()}/${form.birthdate.year.toString()}`
        })

        const newValues = {
            ...values,
            events: eventsSelectedIds,
            eventsDates: formattedDates,
            language: router.locale,
            type: type.value,
        }

        if (isAdmin) {
            eventService.store(newValues).then(() => {
                resetForm()
            })
        } else {
            stripeService.createCheckoutSession(newValues).then(res => {
                router.push(res.url)
            })
        }
    }

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const customerFormValidations = Yup.object().shape({
        forms: Yup.array().of(
            Yup.object().shape({
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
                address: Yup.string().required(t('validation_required')),
                phone_number: Yup.string()
                    .matches(phoneRegExp, t('validation_phone_number_invalid'))
                    .required(t('validation_required')),
                birthdate: Yup.object().shape({
                    day: Yup.number()
                        .min(1, t('validation_birthdate_day_too_low'))
                        .max(31, t('validation_birthdate_day_too_high'))
                        .required(t('validation_required')),
                    month: Yup.number()
                        .min(1, t('validation_birthdate_month_too_low'))
                        .max(12, t('validation_birthdate_month_too_high'))
                        .required(t('validation_required')),
                    year: Yup.number()
                        .min(1900, t('validation_birthdate_year_too_low'))
                        .max(
                            getYear(new Date()) - 17,
                            t('validation_birthdate_year_too_high'),
                        )
                        .required(t('validation_required')),
                }),
            }),
        ),
    })

    const renderCustomerForm = (errors, touched, i = 1, setFieldValue) => {
        return (
            <>
                <BasicTextInput
                    field={`forms.${i}.first_name`}
                    fieldLabel={t('first_name_label')}
                    placeholder={t('first_name_placeholder')}
                    errors={errors}
                    touched={touched}
                    required
                />
                <BasicTextInput
                    field={`forms.${i}.last_name`}
                    fieldLabel={t('last_name_label')}
                    placeholder={t('last_name_placeholder')}
                    errors={errors}
                    touched={touched}
                    required
                />
                <BasicTextInput
                    field={`forms.${i}.email`}
                    fieldLabel={t('email_label')}
                    placeholder={t('email_placeholder')}
                    errors={errors}
                    touched={touched}
                    required
                />
                <BasicAddressField
                    field={`forms.${i}.address`}
                    fieldLabel={t('address_label')}
                    placeholder={t('address_placeholder')}
                    errors={errors}
                    touched={touched}
                    required
                    onSelect={place =>
                        setFieldValue(
                            `forms.${i}.address`,
                            place.formatted_address,
                        )
                    }
                    options={{
                        componentRestrictions: { country: 'CA' },
                        types: ['address'],
                    }}
                />
                <BasicPhoneInput
                    field={`forms.${i}.phone_number`}
                    fieldLabel={t('phone_number_label')}
                    placeholder={t('phone_number_placeholder')}
                    errors={errors}
                    touched={touched}
                    required
                />
                <BasicDateInput
                    field={`forms.${i}.birthdate`}
                    dayField={`forms.${i}.birthdate.day`}
                    monthField={`forms.${i}.birthdate.month`}
                    yearField={`forms.${i}.birthdate.year`}
                    fieldLabel={t('birthdate_label')}
                    dayPlaceholder={t('day_placeholder')}
                    monthPlaceholder={t('month_placeholder')}
                    yearPlaceholder={t('year_placeholder')}
                    errors={errors}
                    touched={touched}
                    required
                />
                <BasicCheckbox
                    field={`forms.${i}.has_manual`}
                    fieldLabel={t('has_manual_label')}
                    placeholder={t('has_manual_placeholder')}
                    errors={errors}
                    touched={touched}
                    required
                />
            </>
        )
    }

    const renderTabs = (errors, touched, values, setFieldValue) => {
        const tabs = []
        const forms = []
        let tabNumber = activeTab

        if (values.forms.length < tabNumber) {
            tabNumber = values.forms.length
        }

        for (let i = 0; i < values.forms.length; i++) {
            if (values.forms.length > 1) {
                tabs.push(
                    <NavItem key={i} role="button">
                        <NavLink
                            className={`${activeTab === i + 1 ? 'active' : ''}`}
                            onClick={() => setActiveTab(i + 1)}>
                            {t(`person_tab_name_${i}`)}
                        </NavLink>
                    </NavItem>,
                )
            }
            forms.push(
                <TabContent key={i} activeTab={tabNumber}>
                    <TabPane tabId={i + 1}>
                        {renderCustomerForm(errors, touched, i, setFieldValue)}
                    </TabPane>
                </TabContent>,
            )
        }

        return (
            <>
                {tabs.length > 1 && (
                    <Nav tabs className="mb-5">
                        {tabs}
                    </Nav>
                )}
                {forms}
            </>
        )
    }

    const toggleModal = resetForm => {
        setModalIsOpen(prev => !prev)
        resetForm()
    }

    return (
        <Formik
            onSubmit={createReservation}
            initialValues={{
                forms: [
                    {
                        first_name: '',
                        last_name: '',
                        email: '',
                        address: '',
                        phone_number: '',
                        birthdate: {
                            day: '',
                            month: '',
                            year: '',
                        },
                        has_manual: false,
                    },
                ],
                number_of_people: '1',
                type: 'brevet_elementaire',
            }}
            validationSchema={customerFormValidations}
            enableReinitialize>
            {({
                isSubmitting,
                touched,
                errors,
                submitForm,
                setFieldValue,
                values,
                initialValues,
                resetForm,
            }) => {
                return (
                    <Modal
                        isOpen={modalIsOpen}
                        toggle={() => toggleModal(resetForm)}
                        size="lg">
                        <ModalHeader toggle={() => toggleModal(resetForm)}>
                            {t('registration')}
                        </ModalHeader>
                        <ModalBody>
                            <>
                                <Form>
                                    <FieldArray
                                        name="forms"
                                        render={arrayHelpers => (
                                            <>
                                                <BasicSelect
                                                    field="number_of_people"
                                                    fieldLabel={t(
                                                        'number_of_people_label',
                                                    )}
                                                    errors={errors}
                                                    touched={touched}
                                                    setFieldValue={
                                                        setFieldValue
                                                    }
                                                    required
                                                    formGroupClasses="mb-2"
                                                    onSelect={e => {
                                                        if (
                                                            e.target.value >
                                                            values.number_of_people
                                                        ) {
                                                            for (
                                                                let i = 0;
                                                                i <
                                                                e.target.value -
                                                                    values.number_of_people;
                                                                i++
                                                            ) {
                                                                arrayHelpers.push(
                                                                    initialValues
                                                                        .forms[0],
                                                                )
                                                            }
                                                        } else if (
                                                            e.target.value <
                                                            values.number_of_people
                                                        ) {
                                                            for (
                                                                let i = 0;
                                                                i <
                                                                values.number_of_people -
                                                                    e.target
                                                                        .value;
                                                                i++
                                                            ) {
                                                                arrayHelpers.pop(
                                                                    '',
                                                                )
                                                            }
                                                        }
                                                        setFieldValue(
                                                            'number_of_people',
                                                            e.target.value,
                                                        )
                                                    }}>
                                                    <option
                                                        disabled={
                                                            maxNumberOfPeopleOptions <
                                                            1
                                                        }>
                                                        1
                                                    </option>
                                                    <option
                                                        disabled={
                                                            maxNumberOfPeopleOptions <
                                                            2
                                                        }>
                                                        2
                                                    </option>
                                                    <option
                                                        disabled={
                                                            maxNumberOfPeopleOptions <
                                                            3
                                                        }>
                                                        3
                                                    </option>
                                                    <option
                                                        disabled={
                                                            maxNumberOfPeopleOptions <
                                                            4
                                                        }>
                                                        4
                                                    </option>
                                                </BasicSelect>
                                                {renderTabs(
                                                    errors,
                                                    touched,
                                                    values,
                                                    setFieldValue,
                                                )}
                                            </>
                                        )}
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
                                className="me-2"
                                disabled={isSubmitting}
                                onClick={() => {
                                    // recaptchaRef.current.execute()
                                    errors.forms?.forEach((form, i) => {
                                        if (form !== undefined) {
                                            setActiveTab(i + 1)
                                        }
                                    })
                                    submitForm()
                                }}>
                                {t('book')}
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
    )
}

export default ReservationForm
