import axios from '@/lib/axios'

const index = () => axios.get('/reservations').then(res => res.data)

const store = values =>
    axios.post('/reservations', values).then(res => res.data)

export default {
    index,
    store,
}
