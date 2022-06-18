import axios from '@/lib/axios'

const index = () => axios.get('/courses').then(res => res.data)

export default {
    index,
}
