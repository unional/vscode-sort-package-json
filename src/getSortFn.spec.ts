import { readFileSync } from 'fs'
import { join } from 'path'
import { expect, it } from 'vitest'
import { getSortFn } from './getSortFn'

it('gets the bundled sort-package-json', () => {
	const pkgJson = JSON.parse(readFileSync(join(__dirname, '../package.json'), 'utf-8'))
	const result = getSortFn(pkgJson, __filename)
	expect(typeof result).toBe('function')
})
