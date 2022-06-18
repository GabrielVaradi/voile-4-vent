import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import {
    Collapse,
    Container,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    NavbarToggler,
    NavItem,
    NavLink,
    UncontrolledDropdown,
} from 'reactstrap'

const Navigation = ({}) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => setIsOpen(!isOpen)

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
            <Container>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="me-auto" navbar>
                        <Link href="/">
                            <a className="navbar-brand">
                                {process.env.NEXT_PUBLIC_APP_NAME}
                            </a>
                        </Link>
                        <Link href="/courses">
                            <a className="navbar-brand">Courses</a>
                        </Link>
                        <Link href="/">
                            <a className="navbar-brand">Reservations</a>
                        </Link>
                        <Link href="/">
                            <a className="navbar-brand">Teachers</a>
                        </Link>
                        {/*<UncontrolledDropdown inNavbar nav>*/}
                        {/*    <DropdownToggle caret nav>*/}
                        {/*        Users*/}
                        {/*    </DropdownToggle>*/}
                        {/*    <DropdownMenu end>*/}
                        {/*        <Link href="/users">*/}
                        {/*            <DropdownItem active={'a' === '/users'}>*/}
                        {/*                Users*/}
                        {/*            </DropdownItem>*/}
                        {/*        </Link>*/}
                        {/*        <Link*/}
                        {/*            href="/users/create"*/}
                        {/*            active={*/}
                        {/*                router.pathname === '/users/create'*/}
                        {/*            }*/}
                        {/*        >*/}
                        {/*            <DropdownItem>Create User</DropdownItem>*/}
                        {/*        </Link>*/}
                        {/*    </DropdownMenu>*/}
                        {/*</UncontrolledDropdown>*/}
                    </Nav>
                </Collapse>
            </Container>
        </nav>
    )
}

export default Navigation
