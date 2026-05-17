import { createRequire } from 'node:module'
import path from 'node:path'
import { sync } from 'read-pkg-up'
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
			const localRequire = createRequire(path.join(dir, 'package.json'))
			const loaded = localRequire('sort-package-json')
			if (typeof loaded === 'function') return loaded
			if (loaded?.default && typeof loaded.default === 'function') return loaded.default
			if (loaded?.sortPackageJson && typeof loaded?.sortPackageJson === 'function') return loaded.sortPackageJson
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
