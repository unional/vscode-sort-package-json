'use strict'
import * as vscode from 'vscode'
import { sortPackageJson } from './sortPackageJson'

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerTextEditorCommand('editor.sortPackageJson', sortPackageJson),
		vscode.languages.registerCodeActionsProvider(
			{ language: 'json', pattern: '**/package.json' },
			new CodeActionProvider()
		)
	)
}

export class CodeActionProvider implements vscode.CodeActionProvider {
	public provideCodeActions() {
		const sortPackageJsonCodeAction = new vscode.CodeAction(
			'Sort well-known keys in package.json',
			vscode.CodeActionKind.Source.append('sortPackageJson')
		)
		sortPackageJsonCodeAction.command = {
			command: 'editor.sortPackageJson',
			title: 'Sort well-known keys in package.json'
		}
		return [sortPackageJsonCodeAction]
	}
}
