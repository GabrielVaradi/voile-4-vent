import axios from '@/lib/axios'

const sendContactUsEmail = values =>
    axios.get('/email/send-contact-us-email', values).then(res => res.data)

export default {
    sendContactUsEmail,
}
