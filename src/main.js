const resolveKeyVal = (vals, instance, keyString) => {
	const keyPath = keyString.trim().split('.')
	const firstKey = keyPath.shift()
	return keyPath.reduce((instance, key) => instance[key], vals[firstKey] || instance[firstKey])
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
		return keys.reduce((mapped, key) => {
			mapped[key] = function (vars) {
				const translation = (locales[(vars || {}).v_locale || this.v_locale || self.locale || self.base] || {})[key] || ''
				return translation.call
				? translation(this, vars)
				: translation.replace(keyRegex, (match, keyString) => resolveKeyVal(vars, this, keyString))
			}
			return mapped
		}, {})
	}
}

export default vI18n
