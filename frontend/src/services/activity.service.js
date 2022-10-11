import axios from '@/lib/axios'

const index = () => axios.get('/activities').then(res => res.data)

export default {
    index,
}
