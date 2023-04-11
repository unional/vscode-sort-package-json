'use strict'
import * as vscode from 'vscode'
import { sortPackageJson } from './sortPackageJson'

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerTextEditorCommand('sort-package-json.sort', sortPackageJson)
	)
	context.subscriptions.push(
		vscode.languages.registerCodeActionsProvider(
			{ language: 'json', pattern: '**/package.json' },
			new CodeActionProvider()
		)
	)
}

export class CodeActionProvider implements vscode.CodeActionProvider {
	public provideCodeActions(): vscode.ProviderResult<vscode.Command[]> {
		return [
			{
				command: 'editor.sortPackageJson',
				title: 'Sort well-known keys in package.json'
			}
		]
	}
}
