import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Collapse, Container, Nav, NavbarToggler } from 'reactstrap'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'

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
                    <Nav navbar className="w-100 d-flex align-items-center">
                        <Link href="/">
                            <a className="navbar-brand">
                                <img
                                    src="/images/logo.png"
                                    width={126}
                                    height={102}
                                    alt=""
                                />
                            </a>
                        </Link>
                        <Link href="/courses">
                            <a className="navbar-brand">{t('courses')}</a>
                        </Link>
                        <Link href="/reservations">
                            <a className="navbar-brand">{t('reservations')}</a>
                        </Link>
                        <Link href="/contact-us">
                            <a className="navbar-brand">{t('contact-us')}</a>
                        </Link>
                        <Link href="/faq">
                            <a className="navbar-brand">{t('faq')}</a>
                        </Link>
                        <Link href="/admin/login">
                            <a className="navbar-brand">{t('admin')}</a>
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
