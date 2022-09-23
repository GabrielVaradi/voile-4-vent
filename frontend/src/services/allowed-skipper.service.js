import axios from '@/lib/axios'

const index = () => axios.get('/allowed-skippers').then(res => res.data)

const store = values =>
    axios.post('/allowed-skippers', values).then(res => res.data)

const update = (allowedSkipperId, values) =>
    axios
        .put(`/allowed-skippers/${allowedSkipperId}`, values)
        .then(res => res.data)

const deleteTodo = allowedSkipperId =>
    axios.delete(`allowed-skippers/${allowedSkipperId}`)

export default {
    index,
    store,
    update,
    deleteTodo,
}
