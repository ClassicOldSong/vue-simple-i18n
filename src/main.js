const resolveKeyVal = (instance, keyString) => {
	const keyPath = keyString.split('.')
	for (let key of keyPath) instance = instance[key]
	return instance
}

const keyRegex = /{{(.*?)}}/g

const vI18n = class {
	constructor (config = {}) {
		this.base = (config.base || 'en-us').toLowerCase()
		this.locale = (config.locale || navigator.language || navigator.browserLanguage || 'en-us').toLowerCase()
		this.locales = config.locales || {}
	}

	map (keys) {
		const self = this
		const mapped = {}
		for (let key of keys) {
			mapped[key] = function () {
				const translation = (self.locales[this.v_locale] || self.locales[self.locale] || self.locales[self.base] || {})[key] || ''
				return typeof translation === 'function'
				? translation(this)
				: translation.replace(keyRegex, (match, keyString) => resolveKeyVal(this, keyString))
			}
		}
		return mapped
	}
}

export default vI18n
