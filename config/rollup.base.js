import chalk from 'chalk'

// Rollup plugins
import buble from 'rollup-plugin-buble'
import eslint from 'rollup-plugin-eslint'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import uglify from 'rollup-plugin-uglify'
import progress from 'rollup-plugin-progress'

// Log build environment
console.log('Target:', chalk.bold.green(process.env.NODE_ENV || 'development'))
switch (process.env.BUILD_ENV) {
	case 'DEV': {
		console.log(chalk.cyan`
+---------------+
| DEVELOP BUILD |
+---------------+
`)
		break
	}
	case 'CI': {
		console.log(chalk.green`
+----------+
| CI BUILD |
+----------+
`)
		break
	}
	default: {
		console.log(chalk.yellow`
+--------------+
| NORMAL BUILD |
+--------------+
`)
	}
}

export default {
	input: 'src/main.js',
	output: {
		name: 'vI18n',
		format: 'iife',
		sourcemap: true
	},
	devDest: 'test/vue-simple-i18n.dev.js',
	proDest: 'dist/vue-simple-i18n.min.js',
	plugins: [
		progress({
			clearLine: false
		}),
		resolve({
			jsnext: true,
			main: true,
			browser: true,
		}),
		commonjs(),
		eslint({
			exclude: ['**/*.html', '**/*.css', '**/*.eft', '**/*.json']
		}),
		buble({
			transforms: {
				modules: false,
				dangerousForOf: true
			},
			objectAssign: 'Object.assign'
		}),
		replace({
			'process.env.NODE_ENV': `'${process.env.NODE_ENV || 'development'}'`
		}),
		(process.env.NODE_ENV === 'production' && uglify())
	]
}
