import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
    Collapse,
    Container,
    Nav,
    NavbarToggler,
    DropdownItem,
    DropdownToggle,
    DropdownMenu,
    UncontrolledDropdown,
} from 'reactstrap'
import { useTranslation } from 'next-i18next'
import { useAuth } from '@/hooks/auth'
import Image from 'next/legacy/image'
import enIcon from '../../../public/images/voile4vents-english.png'
import frIcon from '../../../public/images/voile4vents-french.png'

const Navigation = () => {
    const { locale, pathname } = useRouter()
    const { t } = useTranslation('navigation')
    const { user, logout } = useAuth()

    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => setIsOpen(!isOpen)
    const inverseLocale = useMemo(() => (locale === 'en' ? 'fr' : 'en'), [
        locale,
    ])

    const selectedStyles = { fontWeight: 'bold', textDecoration: 'underline' }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
            <Container>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav navbar className="w-100 d-flex align-items-center">
                        <Link href="/" className="navbar-brand me-0 me-lg-5">
                            <img
                                src="/images/voile4vents-logo.png"
                                width={75}
                                height={75}
                                alt=""
                            />
                        </Link>
                        <Link
                            href="/"
                            className="navbar-brand me-0 me-lg-5"
                            style={pathname === '/' ? selectedStyles : {}}>
                            {t('home')}
                        </Link>
                        <Link
                            href="/courses"
                            className="navbar-brand me-0 me-lg-5"
                            style={
                                pathname === '/courses' ? selectedStyles : {}
                            }>
                            {t('courses')}
                        </Link>
                        <Link
                            href="/activities"
                            className="navbar-brand me-0 me-lg-5"
                            style={
                                pathname === '/activities' ? selectedStyles : {}
                            }>
                            {t('activities')}
                        </Link>
                        {/* <Link href="/reservations">
                            <a
                                className="navbar-brand me-0 me-lg-5"
                                style={
                                    pathname === '/reservations'
                                        ? selectedStyles
                                        : {}
                                }>
                                {t('reservations')}
                            </a>
                        </Link> */}
                        <Link
                            href="/contact-us"
                            className="navbar-brand me-0 me-lg-5"
                            style={
                                pathname === '/contact-us' ? selectedStyles : {}
                            }>
                            {t('contact-us')}
                        </Link>
                        {/* <Link href="/faq">
                            <a
                                className="navbar-brand me-0 me-lg-5"
                                style={
                                    pathname === '/faq' ? selectedStyles : {}
                                }>
                                {t('faq')}
                            </a>
                        </Link> */}
                        {user && (
                            <UncontrolledDropdown>
                                <DropdownToggle
                                    className="text-uppercase text-decoration-none text-black"
                                    color="link"
                                    caret>
                                    {t('admin_menu')}
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem>
                                        <Link
                                            href="/admin"
                                            className="text-decoration-none text-black">
                                            {t('calendar')}
                                        </Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link
                                            href="/admin/todos"
                                            className="text-decoration-none text-black">
                                            {t('todos')}
                                        </Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link
                                            href="/admin/allowed-skippers"
                                            className="text-decoration-none text-black">
                                            {t('allowed_skippers')}
                                        </Link>
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem onClick={logout}>
                                        {t('logout')}
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        )}
                        <Link
                            href={`/${inverseLocale}${pathname}`}
                            locale={inverseLocale}
                            legacyBehavior>
                            <div
                                role="button"
                                className="d-flex ms-0 ms-lg-auto">
                                <a className="navbar-brand me-3">
                                    {t('change_locale', {
                                        locale: inverseLocale,
                                    })}
                                </a>
                                <Image
                                    src={locale === 'en' ? frIcon : enIcon}
                                    width={40}
                                    height={40}
                                />
                            </div>
                        </Link>
                    </Nav>
                </Collapse>
            </Container>
        </nav>
    )
}

export default Navigation
