const { i18n } = require('./next-i18next.config')

module.exports = {
    webpack: (config, dev) => {
        if (dev) {
            config.watchOptions = {
                poll: 1000,
            }
        }
        return config
    },
    i18n,
}
