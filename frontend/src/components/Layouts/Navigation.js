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
    const router = useRouter()
    const { t } = useTranslation('navigation')
    const { user, logout } = useAuth()

    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => setIsOpen(!isOpen)
    const inverseLocale = useMemo(
        () => (router.locale === 'en' ? 'fr' : 'en'),
        [router.locale],
    )

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
            <Container>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav navbar className="w-100 d-flex align-items-center">
                        <Link href="/">
                            <a className="navbar-brand">
                                <img
                                    src="/images/voile4vents-logo.png"
                                    width={75}
                                    height={75}
                                    alt=""
                                />
                            </a>
                        </Link>
                        <Link href="/courses">
                            <a className="navbar-brand">{t('courses')}</a>
                        </Link>
                        <Link href="/activities">
                            <a className="navbar-brand">{t('activities')}</a>
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
                            href={`/${inverseLocale}${router.pathname}`}
                            locale={inverseLocale}>
                            <a className="navbar-brand ms-auto me-3">
                                {t('change_locale', { locale: inverseLocale })}
                            </a>
                        </Link>
                        <Image
                            src={router.locale === 'en' ? frIcon : enIcon}
                            width={40}
                            height={40}
                        />
                    </Nav>
                </Collapse>
            </Container>
        </nav>
    )
}

export default Navigation
