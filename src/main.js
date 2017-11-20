const resolveKeyVal = (vals, instance, keyString) => {
	const keyPath = keyString.trim().split('.')
	const firstKey = keyPath.shift()
	instance = vals[firstKey] || instance[firstKey]
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
		const locales = this.locales
		const mapped = {}
		for (let key of keys) {
			mapped[key] = function (vars) {
				const translation = (locales[(vars || {}).v_locale || this.v_locale || self.locale || self.base] || {})[key] || ''
				return typeof translation === 'function'
				? translation(this, vars)
				: translation.replace(keyRegex, (match, keyString) => resolveKeyVal(vars, this, keyString))
			}
		}
		return mapped
	}
}

export default vI18n
