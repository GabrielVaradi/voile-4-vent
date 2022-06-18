import React, { useEffect } from 'react'
import { courseService } from '../../services'

// import {
//     DropdownItem,
//     DropdownMenu,
//     Pagination,
//     PaginationItem,
//     PaginationLink,
//     UncontrolledDropdown,
//     DropdownToggle,
// } from 'reactstrap'
// import { toast } from 'react-toastify'
// import Head from 'next/head'
// import Link from 'next/link'

const Index = () => {
    useEffect(() => {
        courseService.index().then(({ data }) => console.log(data))
    }, [])

    return <div> Courses </div>
}

export default Index
