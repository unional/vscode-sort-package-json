# vscode-sort-package-json

A [Visual Studio Code extension][marketplace] to sort package.json with [sort-package-json].

## Features

Sort your package.json sensibly.

### Sort Manually

1. Open a `package.json` file
2. Open the Command Palette with <kbd>ctrl</kbd>-<kbd>shift</kbd>-<kbd>P</kbd> (<kbd>cmd</kbd>-<kbd>shift</kbd>-<kbd>P</kbd> for macOS)
3. Select `Sort package.json`

### Sort on Save

To sort all `package.json` files automatically on save, configure your user settings:

1. Open the Command Palette with <kbd>ctrl</kbd>-<kbd>shift</kbd>-<kbd>P</kbd> (<kbd>cmd</kbd>-<kbd>shift</kbd>-<kbd>P</kbd> for macOS)
2. Select `Preferences: Open User Settings (JSON)`
3. Add `"source.sortPackageJson"` to `"editor.codeActionsOnSave"` as shown below

```json5
  "editor.codeActionsOnSave": [
    // Sort package.json keys with
    // https://marketplace.visualstudio.com/items?itemName=unional.vscode-sort-package-json
    "source.sortPackageJson"
  ],
```

[marketplace]: https://marketplace.visualstudio.com/items?itemName=unional.vscode-sort-package-json
[sort-package-json]: https://github.com/keithamus/sort-package-json
