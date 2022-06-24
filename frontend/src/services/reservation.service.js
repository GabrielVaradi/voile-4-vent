import axios from '@/lib/axios'

const index = () => axios.get('/reservations').then(res => res.data)

export default {
    index,
}
