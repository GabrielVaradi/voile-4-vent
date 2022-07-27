import axios from '@/lib/axios'

const createCheckoutSession = values =>
    axios.post('/create-checkout-session', values).then(res => res.data)

export default {
    createCheckoutSession,
}
