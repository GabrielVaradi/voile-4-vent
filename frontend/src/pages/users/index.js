import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import React, { useCallback, useMemo, useEffect, useState } from 'react'
import Truncate from 'react-truncate'
import { useTable, useSortBy, usePagination } from 'react-table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCaretDown,
    faCaretUp,
    faEye,
    faPen,
    faTrash,
} from '@fortawesome/free-solid-svg-icons'
// import format from 'date-fns/format';
import { Pagination, PaginationItem, PaginationLink, Table } from 'reactstrap'
import Link from 'next/link'
import ConfirmModal from '@/components/ConfirmModal'
import { userService } from '@/services'

function ReactTable({
    columns,
    data,
    fetchData,
    loading,
    pageCount: controlledPageCount,
    skipPageResetRef,
    meta,
}) {
    const [pageIndex, setPageIndex] = useState(1)
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        pageOptions,
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
                }}>
                {/*selector for number of entries shown in the table,
                it adds options (based on total number of entries)
                in tens until it reaches 100*/}
                {Array.from({
                    length:
                        Math.ceil(meta.total / 10) < 10
                            ? Math.ceil(meta.total / 10)
                            : 10,
                })
                    .map((v, i) => (i + 1) * 10)
                    .map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
            </select>
            <Table {...getTableProps()} striped className="mb-0 users-table">
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
                    {page.map(row => {
                        prepareRow(row)
                        return (
                            // eslint-disable-next-line react/jsx-key
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => (
                                    // eslint-disable-next-line react/jsx-key
                                    <td {...cell.getCellProps()}>
                                        {cell.render('Cell')}
                                    </td>
                                ))}
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
                                pageIndex={pageIndex}
                                pageOptions={pageOptions}
                                setPageIndex={setPageIndex}
                            />
                        </td>
                    </tr>
                </tfoot>
            </Table>
        </>
    )
}

function PaginationWrapper({ pageIndex, pageOptions, setPageIndex }) {
    return (
        <Pagination className="d-flex justify-content-center">
            {pageOptions.slice(0, 5).map(page => (
                <PaginationItem key={`pagination-item-${page}`}>
                    <PaginationLink onClick={() => setPageIndex(page + 1)}>
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

function displayEventTitles(events) {
    return events?.map(
        e => (
            <a
                href={`events/${e.id}`}
                key="event-{e.id}"
                className="table-cell-link my-0 mx-2">
                <Truncate lines={1} ellipsis="..." width={80}>
                    {e.title}
                </Truncate>
            </a>
        ),
        '',
    )
}

const Index = () => {
    const [displayModal, setDisplayModal] = useState(false)
    const [selectedUser, setSelectedUser] = useState({})

    const columns = useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Email',
                accessor: 'email',
            },
            {
                Header: 'Created',
                // Cell: ({ row }) => format(new Date(row.original.created_at), "yyyy-MM-dd 'at' HH:mm"),
                Cell: ({ row }) => row.original.created_at,
            },
            {
                Header: 'Events',
                Cell: ({ row }) => (
                    <div className="d-flex flex-wrap justify-content-start w-100">
                        {displayEventTitles(row.original.events)}
                    </div>
                ),
            },
            {
                id: 'actions',
                Cell: ({ row }) => (
                    <div
                        className="btn-group btn-group-sm"
                        role="group"
                        aria-label="Actions">
                        <Link href={`/users/${row.original.id}`}>
                            <a
                                className="btn btn-outline-secondary"
                                title="View User">
                                <FontAwesomeIcon icon={faEye} />
                            </a>
                        </Link>
                        <Link
                            href={{
                                pathname: '/users/[id]/edit',
                                query: { id: row.original.id },
                            }}>
                            {/*<Link href={`/users/${row.original.id}/edit`}>*/}
                            <a
                                className="btn btn-outline-primary"
                                title="Edit User">
                                <FontAwesomeIcon icon={faPen} />
                            </a>
                        </Link>
                        <Link href={`#`}>
                            <a
                                className="btn btn-outline-danger"
                                title="Delete User"
                                onClick={e => {
                                    e.preventDefault()
                                    setSelectedUser(row.original)
                                    setDisplayModal(true)
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

    const [data, setData] = useState([])
    const [meta, setMeta] = useState([])
    const [loading, setLoading] = useState(false)
    const [pageCount, setPageCount] = useState(0)

    const fetchData = useCallback(({ pageSize, pageIndex }) => {
        setLoading(true)

        userService.tableData(pageSize, pageIndex).then(({ data, meta }) => {
            setData(data)
            setMeta(meta)
            setPageCount(Math.ceil(meta.total / meta.per_page))
            setLoading(false)
        })
    }, [])

    const deleteUser = () => {
        userService
            .deleteUser(selectedUser.id)
            .then(() => {
                fetchData(1)
            })
            .then(() => {
                setDisplayModal(false)
                setSelectedUser(null)
            })
    }

    return (
        <AppLayout header={'Users'}>
            <Head>
                <title>{process.env.NEXT_PUBLIC_APP_NAME} - Users</title>
            </Head>
            <ReactTable
                columns={columns}
                data={data}
                meta={meta}
                fetchData={fetchData}
                loading={loading}
                pageCount={pageCount}
                skipPageResetRef={false}
            />
            <ConfirmModal
                title="Delete User"
                cancel={() => setDisplayModal(false)}
                confirm={deleteUser}
                open={displayModal}>
                Are you sure you want to remove user: {selectedUser?.name}?
            </ConfirmModal>
        </AppLayout>
    )
}

export default Index
