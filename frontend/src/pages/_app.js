import { appWithTranslation } from 'next-i18next'
import Head from 'next/head'
import '../scss/app.scss'
import AppLayout from '@/components/Layouts/AppLayout'

const App = ({ Component, pageProps }) => {
    return (
        <>
            <Head>
                <title> Voile 4 vents sailing school Montreal</title>
                <meta
                    name="description"
                    content="Voile4vents sailing school in Montreal, learn to sail on Lake St-Louis with our very experienced instructors"
                />
                <meta
                    name="keywords"
                    content="sail, montreal sail, montreal sailing, montreal sailing school, sailing school montreal, sailing, course, courses, Montreal, boat, water, wind, St-Louis, Tanzer, ecole, école, voile, voile4vents, vent, 4, voile 4 vents, Montréal, montréal, Montreal, eau, bateau, voilier, voile montreal, cours de voile montreal, ecole de voile montreal, ecole de voile"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>
            <AppLayout>
                <Component {...pageProps} />
            </AppLayout>
        </>
    )
}

export default appWithTranslation(App)
