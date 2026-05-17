const tsParser = require('@typescript-eslint/parser')
const tsPlugin = require('@typescript-eslint/eslint-plugin')

module.exports = [
	{
		ignores: ['out/**', 'dist/**', '**/*.d.ts']
	},
	{
		files: ['src/**/*.ts'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaVersion: 6,
				sourceType: 'module'
			}
		},
		plugins: {
			'@typescript-eslint': tsPlugin
		},
		rules: {
			'@typescript-eslint/naming-convention': 'warn',
			'eqeqeq': 'warn',
			'no-throw-literal': 'warn',
			'semi': 'off'
		}
	}
]
