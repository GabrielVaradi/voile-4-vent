import React, { useMemo } from 'react'
import languageDetector from '../lib/languageDetector'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/legacy/image'
import enIcon from '../../public/images/voile4vents-english.png'
import frIcon from '../../public/images/voile4vents-french.png'
import { useTranslation } from 'next-i18next'

const LanguageSwitchLink = ({ locale, ...rest }) => {
    const router = useRouter()
    const { t } = useTranslation('navigation')

    let href = rest.href || router.asPath
    let pName = router.pathname
    const inverseLocale = useMemo(() => (locale === 'en' ? 'fr' : 'en'), [
        locale,
    ])

    Object.keys(router.query).forEach(k => {
        if (k === 'locale') {
            pName = pName.replace(`[${k}]`, locale)
            return
        }
        pName = pName.replace(`[${k}]`, router.query[k])
    })
    if (locale) {
        href = rest.href ? `/${locale}${rest.href}` : pName
    }

    return (
        <Link
            className="text-decoration-none ms-auto"
            href={href}
            onClick={() => languageDetector.cache(locale)}>
            <div className="d-flex">
                <div className="navbar-brand me-3">
                    {t('change_locale', {
                        locale: inverseLocale,
                    })}
                </div>
                <Image
                    src={locale === 'en' ? frIcon : enIcon}
                    width={40}
                    height={40}
                />
            </div>
        </Link>
    )
}

export default LanguageSwitchLink
