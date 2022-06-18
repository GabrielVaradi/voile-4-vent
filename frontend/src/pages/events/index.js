import React, { useCallback, useState, useEffect, useMemo, useRef } from 'react'
import AppLayout from '@/components/Layouts/AppLayout'
import { useTable, useSortBy, usePagination } from 'react-table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCaretDown,
    faCaretUp,
    faEye,
    faPen,
    faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { eventService } from '../../services'
import {
    DropdownItem,
    DropdownMenu,
    Pagination,
    PaginationItem,
    PaginationLink,
    UncontrolledDropdown,
    DropdownToggle,
} from 'reactstrap'
import { toast } from 'react-toastify'
import Head from 'next/head'
import Link from 'next/link'

const ToastConfirm = ({ name, id, confirm }) => {
    // const id = `confirm${uuidv4()}`;
    const toastId = `confirm${Math.random() * 1000}`
    return (
        <div className="toast-button__wrapper">
            Are you sure you want to delete {name}
            <button
                className="ms-3 btn__action"
                onClick={() => confirm(id)}
                id={toastId}>
                Confirm
            </button>
        </div>
    )
}

function Table({
    columns,
    data,
    fetchData,
    loading,
    pageCount: controlledPageCount,
    skipPageResetRef,
    meta,
    setPageSizeRef,
}) {
    const [pageIndex, setPageIndex] = useState(1)
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        // Get the state from the instance
        state: { pageSize },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: pageIndex }, // Pass our hoisted table state
            manualPagination: true, // Tell the usePagination
            // hook that we'll handle our own data fetching
            // This means we'll also have to provide our own
            // pageCount.
            pageCount: controlledPageCount,
            autoResetPage: !skipPageResetRef,
            autoResetExpanded: !skipPageResetRef,
            autoResetGroupBy: !skipPageResetRef,
            autoResetSelectedRows: !skipPageResetRef,
            autoResetSortBy: !skipPageResetRef,
            autoResetFilters: !skipPageResetRef,
            autoResetRowState: !skipPageResetRef,
        },
        useSortBy,
        usePagination,
    )

    // Listen for changes in pagination and use the state to fetch our new data
    useEffect(() => {
        fetchData({ pageIndex, pageSize })
    }, [fetchData, pageIndex, pageSize])

    return (
        <>
            <select
                className="form-select form-select-sm float-end w-auto"
                value={pageSize}
                onChange={e => {
                    setPageSize(Number(e.target.value))
                    setPageSizeRef(Number(e.target.value))
                }}>
                {[10, 20, 30, 40, 50].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                    </option>
                ))}
            </select>
            <table {...getTableProps()} className="table table-striped mb-0">
                <thead>
                    {headerGroups.map(headerGroup => (
                        // eslint-disable-next-line react/jsx-key
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                // Add the sorting props to control sorting. For this example
                                // we can add them into the header props
                                // eslint-disable-next-line react/jsx-key
                                <th
                                    {...column.getHeaderProps(
                                        column.getSortByToggleProps(),
                                    )}>
                                    {column.render('Header')}
                                    {/* Add a sort direction indicator */}
                                    <span>
                                        {column.isSorted ? (
                                            column.isSortedDesc ? (
                                                <FontAwesomeIcon
                                                    icon={faCaretDown}
                                                />
                                            ) : (
                                                <FontAwesomeIcon
                                                    icon={faCaretUp}
                                                />
                                            )
                                        ) : (
                                            ''
                                        )}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()} key={`row-${i}`}>
                                {row.cells.map((cell, i) => {
                                    return (
                                        <td
                                            {...cell.getCellProps()}
                                            key={`cell-${i}`}>
                                            {cell.render('Cell')}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                    <tr>
                        {loading ? (
                            // Use our custom loading state to show a loading indicator
                            <td colSpan="10000">Loading...</td>
                        ) : (
                            <td colSpan="10000">
                                Showing {meta.from} to {meta.to} of {meta.total}{' '}
                                entries
                            </td>
                        )}
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="10000">
                            <PaginationWrapper
                                gotoPage={gotoPage}
                                canPreviousPage={canPreviousPage}
                                previousPage={previousPage}
                                nextPage={nextPage}
                                canNextPage={canNextPage}
                                pageIndex={pageIndex}
                                pageOptions={pageOptions}
                                pageCount={pageCount}
                                setPageIndex={setPageIndex}
                            />
                        </td>
                    </tr>
                </tfoot>
            </table>
        </>
    )
}

function PaginationWrapper({ pageIndex, pageOptions, setPageIndex }) {
    return (
        <Pagination className="d-flex justify-content-center">
            {pageOptions.slice(0, 5).map(page => (
                <PaginationItem key={`pagination-item-${page}`}>
                    <PaginationLink
                        onClick={() => {
                            setPageIndex(page + 1)
                        }}>
                        {page + 1}
                    </PaginationLink>
                </PaginationItem>
            ))}
            {pageOptions.length > 5 && pageIndex !== pageOptions.length && (
                <PaginationItem>
                    <PaginationLink
                        next
                        onClick={() => setPageIndex(pageIndex + 1)}
                    />
                </PaginationItem>
            )}
        </Pagination>
    )
}

const Index = () => {
    const [data, setData] = useState([])
    const [meta, setMeta] = useState([])
    const [loading, setLoading] = useState(false)
    const [pageCount, setPageCount] = useState(0)

    const pageSizeRef = useRef(10)

    const setPageSizeRef = size => {
        pageSizeRef.current = size
    }

    const fetchData = useCallback(({ pageSize, pageIndex }) => {
        setLoading(true)

        eventService.getEvents(pageSize, pageIndex).then(({ data, meta }) => {
            setData(data)
            setMeta(meta)
            setPageCount(Math.ceil(meta.total / meta.per_page))
            setLoading(false)
        })
    }, [])

    const deleteEvent = eventId => {
        eventService
            .destroy(eventId)
            .then(() => {
                fetchData({ pageSize: pageSizeRef.current, pageIndex: 1 })
                toast.success(`Event deleted`, {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                })
            })
            .catch(() => {
                toast.error('Unable to delete event', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                })
            })
    }

    const columns = useMemo(
        () => [
            {
                Header: 'Title',
                accessor: 'title',
            },
            {
                Header: 'Address',
                accessor: 'address',
            },
            {
                Header: 'Contact name',
                accessor: 'contact_name',
            },
            {
                Header: 'Users',
                accessor: data => {
                    const users = data.users
                    if (users.length) {
                        return (
                            <UncontrolledDropdown>
                                <DropdownToggle>Users</DropdownToggle>
                                <DropdownMenu>
                                    {users.map(user => (
                                        <DropdownItem
                                            key={user.id}
                                            onClick={() =>
                                                (window.location.href = `/users/${user.id}`)
                                            }>
                                            {' '}
                                            {user.name}
                                        </DropdownItem>
                                    ))}
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        )
                    }
                    return 'No Users'
                },
            },
            {
                id: 'actions',
                Cell: ({ row }) => (
                    <div
                        className="btn-group btn-group-sm"
                        role="group"
                        aria-label="Actions">
                        <Link href={`/events/${row.original.id}`}>
                            <a
                                className="btn btn-outline-secondary"
                                title="View Event">
                                <FontAwesomeIcon icon={faEye} />
                            </a>
                        </Link>
                        <Link
                            href={{
                                pathname: '/events/[id]/edit',
                                query: { id: row.original.id },
                            }}>
                            <a
                                className="btn btn-outline-primary"
                                title="Edit Event">
                                <FontAwesomeIcon icon={faPen} />
                            </a>
                        </Link>
                        <Link href={'#'}>
                            <a
                                className="btn btn-outline-danger"
                                href="#"
                                title="Delete Event"
                                onClick={e => {
                                    e.preventDefault()
                                    toast.error(
                                        <ToastConfirm
                                            name={row.original.title}
                                            id={row.original.id}
                                            confirm={deleteEvent}
                                        />,
                                        {
                                            position: 'top-right',
                                            autoClose: 5000,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                            draggable: true,
                                        },
                                    )
                                }}>
                                <FontAwesomeIcon icon={faTrash} />
                            </a>
                        </Link>
                    </div>
                ),
            },
        ],
        [],
    )

    return (
        <AppLayout header={'Events'}>
            <Head>
                <title>{process.env.NEXT_PUBLIC_APP_NAME} - Events</title>
            </Head>
            <Table
                columns={columns}
                data={data}
                meta={meta}
                fetchData={fetchData}
                loading={loading}
                pageCount={pageCount}
                skipPageResetRef={false}
                setPageSizeRef={setPageSizeRef}
            />
        </AppLayout>
    )
}

export default Index
