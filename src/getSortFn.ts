import * as path from 'path'
import { sync } from 'read-pkg-up'
import * as resolve from 'resolve'
import * as sortPackageJsonExports from 'sort-package-json'

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
			return require(modulePath)
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
