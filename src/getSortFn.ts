import path from 'path'
import { readPackageUpSync } from 'read-pkg-up'
import resolve from 'resolve'
import sortPackageJsonExports from 'sort-package-json'

export function getSortFn(pjson: any, fileName: string): sortPackageJsonExports {
  const dir = path.dirname(fileName)
  if (hasSortPackageJsonPkg(pjson)) {
    const modulePath = resolve.sync('sort-package-json', { basedir: dir })
    return require(modulePath)
  }

  const res = readPackageUpSync({ cwd: path.resolve(dir, '..'), normalize: false })

  if (res?.packageJson) return getSortFn(res.packageJson, res.path)

  return sortPackageJsonExports
}

function hasSortPackageJsonPkg(json: any) {
  return json.dependencies && json.dependencies['sort-package-json'] ||
    json.devDependencies && json.devDependencies['sort-package-json']
}
