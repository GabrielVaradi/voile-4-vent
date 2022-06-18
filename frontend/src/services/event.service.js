import axios from '@/lib/axios'

const index = () => axios.get('/events').then(res => res.data)

const getEvents = (perPage, page) =>
    axios
        .get('/events/table-data', {
            params: {
                per_page: perPage,
                page,
            },
        })
        .then(res => res.data)

const getEventUsers = eventId =>
    axios.get(`/events/${eventId}/users`).then(res => res.data)

const show = event => axios.get(`/events/${event}`).then(res => res.data)

const store = values => axios.post('/events', values).then(res => res.data)

const update = (eventId, values) =>
    axios.put(`/events/${eventId}`, values).then(res => res.data)

const destroy = eventId =>
    axios.delete(`/events/${eventId}`).then(res => res.data)

export default {
    index,
    getEvents,
    getEventUsers,
    show,
    store,
    update,
    destroy,
}
