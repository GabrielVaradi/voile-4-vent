import React, { useState } from 'react'
import Link from '../Link'
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
import LanguageSwitchLink from '../LanguageSwitchLink'
import i18nextConfig from '../../../next-i18next.config'

const Navigation = () => {
    const { query, pathname } = useRouter()
    const { t } = useTranslation('navigation')
    const { user, logout } = useAuth()
    const currentLocale = query.locale || i18nextConfig.i18n.defaultLocale

    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => setIsOpen(!isOpen)

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
                                alt="Voile4vents logo"
                            />
                        </Link>
                        <Link
                            href="/"
                            className="navbar-brand me-0 me-lg-5"
                            style={
                                pathname === '/[locale]' ? selectedStyles : {}
                            }>
                            {t('home')}
                        </Link>
                        <Link
                            href="/courses"
                            className="navbar-brand me-0 me-lg-5"
                            style={
                                pathname === '/[locale]/courses'
                                    ? selectedStyles
                                    : {}
                            }>
                            {t('courses')}
                        </Link>
                        <Link
                            href="/activities"
                            className="navbar-brand me-0 me-lg-5"
                            style={
                                pathname === '/[locale]/activities'
                                    ? selectedStyles
                                    : {}
                            }>
                            {t('activities')}
                        </Link>
                        {/* <Link href="/reservations">
                            <a
                                className="navbar-brand me-0 me-lg-5"
                                style={
                                    pathname === '/[locale]/reservations'
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
                                pathname === '/[locale]/contact-us'
                                    ? selectedStyles
                                    : {}
                            }>
                            {t('contact-us')}
                        </Link>
                        {/* <Link href="/faq">
                            <a
                                className="navbar-brand me-0 me-lg-5"
                                style={
                                    pathname === '/[locale]/faq' ? selectedStyles : {}
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
                        {i18nextConfig.i18n.locales.map(locale => {
                            if (locale === currentLocale) return null
                            return (
                                <LanguageSwitchLink
                                    locale={locale}
                                    key={locale}
                                />
                            )
                        })}
                    </Nav>
                </Collapse>
            </Container>
        </nav>
    )
}

export default Navigation
