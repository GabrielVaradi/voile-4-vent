// import React, { useState, useEffect } from 'react'
import React from 'react'
// import { useRouter } from 'next/router'
// import { eventService } from '../services'
// import Select from 'react-select'
// import { Container, Button, ModalHeader, ModalBody, Modal } from 'reactstrap'
import { useTranslation } from 'next-i18next'
// import Calendar from '@/components/Calendar'
// import { coursesTypes } from '@/constants/reservations.constants'

// import ReservationForm from '@/components/Forms/ReservationForm'
// import {
//     addEventsWithSameDate,
//     checkIfAllDaysAreSelected,
//     resetCalendar,
// } from '@/utils/reservations.utils'
// import AdminCalendar from '@/components/AdminCalendar'
// import Link from 'next/link'
// import Reaptcha from 'reaptcha'

const ReservationComponent = () => {
    // const ReservationComponent = ({ isAdmin }) => {
    // const router = useRouter()
    const { t } = useTranslation('reservations')
    // const recaptchaRef = useRef()

    return (
        <h1 className="d-flex justify-content-center mt-5">
            {t('available_soon')}
        </h1>
    )

    // const [daysSelected, setDaysSelected] = useState([])
    // const [eventsSelected, setEventsSelected] = useState([])
    // const [events, setEvents] = useState([])
    // const [mappedEvents, setMappedEvents] = useState([])
    // const [modalIsOpen, setModalIsOpen] = useState(false)
    // const [tooManyDaysError, setTooManyDaysError] = useState(false)
    // const [successModalIsOpen, setSuccessModalIsOpen] = useState(false)
    // const [type, setType] = useState({
    //     value: coursesTypes.beginner_skipper.value,
    //     label: t(coursesTypes.beginner_skipper.label),
    //     days: coursesTypes.beginner_skipper.days,
    // })

    // const options = [
    //     {
    //         value: coursesTypes.beginner_skipper.value,
    //         label: t(coursesTypes.beginner_skipper.label),
    //         days: coursesTypes.beginner_skipper.days,
    //     },
    //     {
    //         value: coursesTypes.initiation_sailing.value,
    //         label: t(coursesTypes.initiation_sailing.label),
    //         days: coursesTypes.initiation_sailing.days,
    //     },
    //     {
    //         value: coursesTypes.regata.value,
    //         label: t(coursesTypes.regata.label),
    //         days: coursesTypes.regata.days,
    //     },
    // ]

    // useEffect(() => {
    //     const type = router.query?.type
    //     if (type) {
    //         setType(options.filter(option => option.value === type)[0])
    //     }
    // }, [router])

    // useEffect(() => {
    //     const query = new URLSearchParams(window.location.search)
    //     if (query.get('success')) {
    //         setSuccessModalIsOpen(true)
    //         router.push('/reservations', undefined, { shallow: true })
    //     }
    //     if (query.get('canceled')) {
    //         console.log(
    //             'Order canceled -- continue to shop around and checkout when you’re ready.',
    //         )
    //     }
    // }, [])

    // useEffect(() => {
    //     const action = isAdmin
    //         ? eventService.index()
    //         : eventService.eventsCalendar()
    //     action.then(({ data }) => setEvents(data))
    // }, [])

    // useEffect(() => {
    //     if (events.length > 0) {
    //         const mapped = events.map(event => ({
    //             id: event.id,
    //             start: event.start,
    //             end: event.end,
    //             title_en: event.title_en,
    //             title_fr: event.title_fr,
    //             reservations: event.reservations,
    //             max_reservations: event.max_reservations,
    //         }))
    //         setMappedEvents(mapped)
    //     }
    // }, [events])

    // const toggleSuccessModal = () => {
    //     setSuccessModalIsOpen(prev => !prev)
    // }

    // return (
    //     <Container className="mt-5">
    //         <h1 className="mb-4">{t('page_title')}</h1>
    //         <div>{t('type')}</div>
    //         <Select
    //             name="type"
    //             id="type"
    //             instanceId="type"
    //             options={options}
    //             onChange={option => {
    //                 setType(option)
    //                 resetCalendar(setDaysSelected, setEventsSelected)
    //             }}
    //             value={type}
    //             styles={{
    //                 menu: base => ({ ...base, zIndex: 1000 }),
    //             }}
    //         />
    //         <ul className="mt-4">
    //             <li>
    //                 {t('helper_text_select_days', {
    //                     count: type.days,
    //                     days: type.days,
    //                 })}
    //             </li>
    //             <li>
    //                 {t('helper_text_contact_us_description_1')}
    //                 <Link href={`/contact-us`}>
    //                     <a>{t('helper_text_contact_us_link')}</a>
    //                 </Link>
    //                 {t('helper_text_contact_us_description_2')}
    //             </li>
    //             <li>{t('helper_text_available_months')}</li>
    //             {tooManyDaysError && (
    //                 <li className="text-danger">
    //                     {t('helper_text_too_many_days_error')}
    //                 </li>
    //             )}
    //         </ul>
    //         {isAdmin ? (
    //             <AdminCalendar
    //                 events={mappedEvents}
    //                 daysSelected={daysSelected}
    //                 setDaysSelected={setDaysSelected}
    //                 type={type}
    //             />
    //         ) : (
    //             <Calendar
    //                 events={mappedEvents}
    //                 daysSelected={daysSelected}
    //                 setDaysSelected={setDaysSelected}
    //                 type={type}
    //                 setTooManyDaysError={setTooManyDaysError}
    //             />
    //         )}
    //         <Button
    //             color="primary"
    //             className="mt-5 w-100"
    //             disabled={checkIfAllDaysAreSelected(daysSelected, type)}
    //             onClick={() => {
    //                 setModalIsOpen(prev => !prev)
    //                 addEventsWithSameDate(
    //                     daysSelected,
    //                     events,
    //                     setEventsSelected,
    //                 )
    //             }}>
    //             {t('book_now')}
    //         </Button>
    //         <ReservationForm
    //             daysSelected={daysSelected}
    //             eventsSelected={eventsSelected}
    //             type={type}
    //             router={router}
    //             modalIsOpen={modalIsOpen}
    //             setModalIsOpen={setModalIsOpen}
    //             isAdmin={isAdmin}
    //             // recaptchaRef={recaptchaRef}
    //         />
    //         {/*<Reaptcha*/}
    //         {/*    sitekey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_PUBLIC_KEY}*/}
    //         {/*    ref={e => (recaptchaRef.current = e)}*/}
    //         {/*    size="invisible"*/}
    //         {/*    hl={router.locale}*/}
    //         {/*/>*/}
    //         <Modal
    //             centered
    //             isOpen={successModalIsOpen}
    //             toggle={toggleSuccessModal}
    //             size="lg">
    //             <ModalHeader toggle={toggleSuccessModal}>
    //                 {t('booking_success_title')}
    //             </ModalHeader>
    //             <ModalBody className="h4 my-3">
    //                 {t('booking_success_description')}
    //             </ModalBody>
    //         </Modal>
    //     </Container>
    // )
}

export default ReservationComponent
