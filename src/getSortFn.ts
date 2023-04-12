import path from 'path'
import { sync } from 'read-pkg-up'
import resolve from 'resolve'
import sortPackageJsonExports from 'sort-package-json'
import { sortPackageJson } from './sortPackageJson'

export function getSortFn(pjson: any, fileName: string): sortPackageJsonExports {
	const dir = path.dirname(fileName)

	const sortPackageJson = tryLoadSortPackageJson(dir, pjson)
	if (sortPackageJson) return sortPackageJson

	const res = sync({ cwd: path.resolve(dir, '..'), normalize: false })

	if (res?.packageJson) return getSortFn(res.packageJson, res.path)

	return sortPackageJsonExports
}

function tryLoadSortPackageJson(dir: string, pjson: Record<string, any>): sortPackageJsonExports | undefined {
	try {
		if (hasSortPackageJsonPkg(pjson)) {
			const modulePath = resolve.sync('sort-package-json', { basedir: dir })
			const sortPackageJson = require(modulePath)
			if (typeof sortPackageJson === 'function') return sortPackageJson
			if (sortPackageJson?.default && typeof sortPackageJson === 'function') return sortPackageJson.default
			if (sortPackageJson?.sortPacakgeJson && typeof sortPackageJson?.sortPacakgeJson === 'function')
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
