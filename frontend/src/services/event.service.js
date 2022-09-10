import axios from '@/lib/axios'

const index = () => axios.get('/events').then(res => res.data)

const store = values => axios.post('/events', values).then(res => res.data)

const testSendEmail = values =>
    axios.post('/events/testSendEmail', values).then(res => res.data)

export default {
    index,
    store,
    testSendEmail,
}
