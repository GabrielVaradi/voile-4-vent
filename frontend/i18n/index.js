const activitiesEn = require('./activities.en.json')
const activitiesFr = require('./activities.fr.json')

const i18n = {
    translations: {
        activitiesEn,
        activitiesFr,
    },
    defaultLang: 'fr',
    useBrowserDefault: true,
}

module.exports = i18n
