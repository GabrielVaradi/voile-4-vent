import axios from '@/lib/axios'

const index = () => axios.get('/events').then(res => res.data)

const store = values => axios.post('/events', values).then(res => res.data)

export default {
    index,
    store,
}
