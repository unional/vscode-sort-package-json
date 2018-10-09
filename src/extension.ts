'use strict';
import * as vscode from 'vscode';
import { sortPackageJson } from './sortPackageJson';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(vscode.commands.registerTextEditorCommand('editor.sortPackageJson', sortPackageJson));
}
