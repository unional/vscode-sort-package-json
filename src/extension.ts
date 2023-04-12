'use strict'
import * as vscode from 'vscode'
import { sortPackageJson } from './sortPackageJson'

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerTextEditorCommand('editor.sortPackageJson', sortPackageJson)
	)
	context.subscriptions.push(
		vscode.languages.registerCodeActionsProvider(
			{ language: 'json', pattern: '**/package.json' },
			new CodeActionProvider()
		)
	)
}

export class CodeActionProvider implements vscode.CodeActionProvider {
	public provideCodeActions() {
		return [
			{
				title: 'Sort well-known keys in package.json',
				kind: vscode.CodeActionKind.SourceFixAll,
				command: {
					title: 'Sort well-known keys in package.json',
					command: 'editor.sortPackageJson'
				}
			}
		]
	}
}
