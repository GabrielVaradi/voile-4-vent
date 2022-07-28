import axios from '@/lib/axios'

const index = () => axios.get('/teachers').then(res => res.data)

export default {
    index,
}
