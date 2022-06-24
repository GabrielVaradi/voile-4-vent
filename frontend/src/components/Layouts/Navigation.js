import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Collapse, Container, Nav, NavbarToggler } from 'reactstrap'
import { useTranslation } from 'next-i18next'

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()
    const { t } = useTranslation('navigation')

    const toggle = () => setIsOpen(!isOpen)

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
            <Container>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav navbar className="w-100">
                        <Link href="/">
                            <a className="navbar-brand">
                                {process.env.NEXT_PUBLIC_APP_NAME}
                            </a>
                        </Link>
                        <Link href="/courses">
                            <a className="navbar-brand">{t('courses')}</a>
                        </Link>
                        <Link href="/reservations">
                            <a className="navbar-brand">{t('reservations')}</a>
                        </Link>
                        <Link href="/teachers">
                            <a className="navbar-brand">{t('teachers')}</a>
                        </Link>
                        <Link href="/contact-us">
                            <a className="navbar-brand">{t('contact-us')}</a>
                        </Link>
                        <Link
                            href={`/${router.locale === 'en' ? 'fr' : 'en'}${
                                router.pathname
                            }`}
                            locale={router.locale === 'en' ? 'fr' : 'en'}>
                            <button className="ms-auto">
                                {t('change-locale')}
                            </button>
                        </Link>
                    </Nav>
                </Collapse>
            </Container>
        </nav>
    )
}

export default Navigation
