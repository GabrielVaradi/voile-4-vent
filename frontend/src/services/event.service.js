import axios from '@/lib/axios'

const index = () => axios.get('/events').then(res => res.data)

export default {
    index,
}
