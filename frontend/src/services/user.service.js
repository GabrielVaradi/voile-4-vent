import axios from '@/lib/axios'

const show = userId => axios.get(`/users/${userId}`).then(res => res.data)

const tableData = (perPage, page) =>
    axios
        .get('/users/table-data', {
            params: {
                per_page: perPage,
                page,
            },
        })
        .then(res => res.data)

const selectData = async (perPage, page) =>
    axios
        .get('/users/select-data', {
            params: {
                per_page: perPage,
                page,
            },
        })
        .then(res => res.data)

const store = values => axios.post('/users', values).then(res => res.data)

const update = (userId, values) =>
    axios.put(`/users/${userId}`, values).then(res => res.data)


const deleteUser = userId => axios.delete(`users/${userId}`)

export default {
    show,
    tableData,
    selectData,
    store,
    update,
    deleteUser,
}
