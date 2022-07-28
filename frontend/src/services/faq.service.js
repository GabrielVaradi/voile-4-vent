import axios from '@/lib/axios'

const index = () => axios.get('/faqs').then(res => res.data)

export default {
    index,
}
