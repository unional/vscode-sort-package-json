import vscode, { TextEditor, TextEditorEdit } from 'vscode';
import { getSortFn } from './getSortFn';

export function sortPackageJson(textEditor: TextEditor, edit: TextEditorEdit) {
  if (!textEditor.document.fileName.endsWith('package.json')) {
    vscode.window.showWarningMessage('Active file is not package.json');
    return
  }

  const text = textEditor.document.getText()
  const json = tryParseJson(text)

  if (json) {
    const sort = getSortFn(json, textEditor.document.fileName)
    edit.replace(getWholeTextRange(textEditor), JSON.stringify(sort(json), null, 2))
  }
}

function tryParseJson(text) {
  try {
    return JSON.parse(text)
  }
  catch (e) {
    return undefined
  }
}

function getWholeTextRange(textEditor: TextEditor) {
  const firstLine = textEditor.document.lineAt(0);
  const lastLine = textEditor.document.lineAt(textEditor.document.lineCount - 1);
  return new vscode.Range(0,
    firstLine.range.start.character,
    textEditor.document.lineCount - 1,
    lastLine.range.end.character);
}
