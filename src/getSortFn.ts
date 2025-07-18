import path from 'node:path'
import { sync } from 'read-pkg-up'
import resolve from 'resolve'
import sortPackageJsonExports from 'sort-package-json'

export function getSortFn(pjson: any, fileName: string): typeof sortPackageJsonExports {
	const dir = path.dirname(fileName)

	const sortPackageJson = tryLoadSortPackageJson(dir, pjson)
	if (sortPackageJson) return sortPackageJson

	const res = sync({ cwd: path.resolve(dir, '..'), normalize: false })

	if (res?.packageJson) return getSortFn(res.packageJson, res.path)

	return sortPackageJsonExports
}

function tryLoadSortPackageJson(dir: string, pjson: Record<string, any>): typeof sortPackageJsonExports | undefined {
	try {
		if (hasSortPackageJsonPkg(pjson)) {
			const modulePath = resolve.sync('sort-package-json', { basedir: dir })
			const sortPackageJson = require(modulePath)
			if (typeof sortPackageJson === 'function') return sortPackageJson
			if (sortPackageJson?.default && typeof sortPackageJson === 'function') return sortPackageJson.default
			if (sortPackageJson?.sortPackageJson && typeof sortPackageJson?.sortPackageJson === 'function')
				return sortPackageJson.sortPackageJson
			return undefined
		}
	} catch (e) {
		return undefined
	}
}

function hasSortPackageJsonPkg(json: any) {
	return (
		(json.dependencies && json.dependencies['sort-package-json']) ||
		(json.devDependencies && json.devDependencies['sort-package-json'])
	)
}
