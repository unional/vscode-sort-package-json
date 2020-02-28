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
    const text = getWholeTextRange(textEditor)
    edit.replace(text, JSON.stringify(sort(json), null, 2))
    // insert newline if previously present
    if (text.end.character === 0) {
      edit.insert(text.end, '\n')
    }
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
