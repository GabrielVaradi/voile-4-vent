import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import {
    Collapse,
    Container,
    Nav,
    NavbarToggler,
    Button,
    DropdownItem,
    DropdownToggle,
    DropdownMenu,
    UncontrolledDropdown,
} from 'reactstrap'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useAuth } from '@/hooks/auth'

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()
    const { t } = useTranslation('navigation')

    const toggle = () => setIsOpen(!isOpen)

    const { user, logout } = useAuth()

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
                        <Link href="/admin-login">
                            <a className="navbar-brand">{t('admin')}</a>
                        </Link>
                        {user && (
                            <UncontrolledDropdown>
                                <DropdownToggle color="link" caret>
                                    {t('admin_menu')}
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem>
                                        <Link href="/admin">
                                            <a className="navbar-brand">
                                                {t('calendar')}
                                            </a>
                                        </Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link href="/admin/todos">
                                            <a className="navbar-brand">
                                                {t('todos')}
                                            </a>
                                        </Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link href="/admin/allowed-skippers">
                                            <a className="navbar-brand">
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
