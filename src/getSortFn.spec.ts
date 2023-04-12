import { it, expect } from '@jest/globals'
import { readFileSync } from 'fs'
import { getSortFn } from './getSortFn'
import { join } from 'path'

it('gets the bundled sort-package-json', () => {
	const pkgJson = JSON.parse(readFileSync(join(__dirname, '../package.json'), 'utf-8'))
	const result = getSortFn(pkgJson, __filename)
	expect(typeof result).toBe('function')
})
