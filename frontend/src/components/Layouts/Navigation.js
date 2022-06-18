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

const Navigation = ({ }) => {
    const router = useRouter()


    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => setIsOpen(!isOpen)

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
            <Container>
                <Link href="/dashboard">
                    <a className="navbar-brand">
                        {process.env.NEXT_PUBLIC_APP_NAME}
                    </a>
                </Link>
                <NavbarToggler onClick={toggle} />
            </Container>
        </nav>


    )
}

export default Navigation
