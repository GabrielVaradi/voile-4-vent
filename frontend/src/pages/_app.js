import { appWithTranslation } from 'next-i18next'
import '../scss/app.scss'
import AppLayout from '@/components/Layouts/AppLayout'

const App = ({ Component, pageProps }) => {
    return (
        <AppLayout>
            <Component {...pageProps} />
        </AppLayout>
    )
}

export default appWithTranslation(App)
