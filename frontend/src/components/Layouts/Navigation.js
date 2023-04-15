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
import Image from 'next/image'
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

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
            <Container>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav navbar className="w-100 d-flex align-items-center">
                        <Link href="/">
                            <a className="navbar-brand me-0 me-md-5">
                                <img
                                    src="/images/voile4vents-logo.png"
                                    width={75}
                                    height={75}
                                    alt=""
                                />
                            </a>
                        </Link>
                        <Link href="/">
                            <a
                                className="navbar-brand me-0 me-md-5"
                                style={{
                                    color: pathname === '/' ? 'red' : 'unset',
                                }}>
                                {t('home')}
                            </a>
                        </Link>
                        <Link href="/courses">
                            <a
                                className="navbar-brand me-0 me-md-5"
                                style={{
                                    color:
                                        pathname === '/courses'
                                            ? 'red'
                                            : 'unset',
                                }}>
                                {t('courses')}
                            </a>
                        </Link>
                        <Link href="/activities">
                            <a
                                className="navbar-brand me-0 me-md-5"
                                style={{
                                    color:
                                        pathname === '/activities'
                                            ? 'red'
                                            : 'unset',
                                }}>
                                {t('activities')}
                            </a>
                        </Link>
                        <Link href="/reservations">
                            <a
                                className="navbar-brand me-0 me-md-5"
                                style={{
                                    color:
                                        pathname === '/reservations'
                                            ? 'red'
                                            : 'unset',
                                }}>
                                {t('reservations')}
                            </a>
                        </Link>
                        <Link href="/contact-us">
                            <a
                                className="navbar-brand me-0 me-md-5"
                                style={{
                                    color:
                                        pathname === '/contact-us'
                                            ? 'red'
                                            : 'unset',
                                }}>
                                {t('contact-us')}
                            </a>
                        </Link>
                        <Link href="/faq">
                            <a
                                className="navbar-brand me-0 me-md-5"
                                style={{
                                    color:
                                        pathname === '/faq' ? 'red' : 'unset',
                                }}>
                                {t('faq')}
                            </a>
                        </Link>
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
                                        <Link href="/admin">
                                            <a className="text-decoration-none text-black">
                                                {t('calendar')}
                                            </a>
                                        </Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link href="/admin/todos">
                                            <a className="text-decoration-none text-black">
                                                {t('todos')}
                                            </a>
                                        </Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link href="/admin/allowed-skippers">
                                            <a className="text-decoration-none text-black">
                                                {t('allowed_skippers')}
                                            </a>
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
                            locale={inverseLocale}>
                            <div
                                role="button"
                                className="d-flex ms-0 ms-md-auto">
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
