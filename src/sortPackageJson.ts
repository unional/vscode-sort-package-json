import { Range, TextEditor, TextEditorEdit } from 'vscode'
import { getSortFn } from './getSortFn'

export function sortPackageJson(textEditor: TextEditor, edit: TextEditorEdit) {
	if (!textEditor.document.fileName.endsWith('package.json')) {
		console.info(
			`editor.sortPackageJson is invoked but active file is ${textEditor.document.fileName} and not package.json. This is a concurrency bug from vscode.`
		)
		return
	}

	const text = textEditor.document.getText()
	const json = tryParseJson(text)

	if (json) {
		const sort = getSortFn(json, textEditor.document.fileName)
		const text = getWholeTextRange(textEditor)
		edit.replace(text, JSON.stringify(sort(json), null, textEditor.options.insertSpaces ? textEditor.options.tabSize : '\t'))
		// insert newline if previously present
		if (text.end.character === 0) {
			edit.insert(text.end, '\n')
		}
	}
}

function tryParseJson(text: string) {
	try {
		return JSON.parse(text)
	} catch (e) {
		console.error(e)
		return undefined
	}
}

function getWholeTextRange(textEditor: TextEditor) {
	const firstLine = textEditor.document.lineAt(0)
	const lastLine = textEditor.document.lineAt(textEditor.document.lineCount - 1)
	return new Range(
		0,
		firstLine.range.start.character,
		textEditor.document.lineCount - 1,
		lastLine.range.end.character
	)
}
