// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'

const insertFmtPrintln = (text: string) => {
	const editor = vscode.window.activeTextEditor

	if (!editor) {
		vscode.window.showErrorMessage('Cannot insert fmt.Println() when no document is open')
		return
	}

	const {selection} = editor
	const range = new vscode.Range(selection.start, selection.end)

	editor.edit((editBuilder) => {
		editBuilder.replace(range, text)
	})
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	console.log('go-fmt-utils is now active!')

	let insertFmtStatement = vscode.commands.registerCommand('go-fmt-utils.insertFmtStatement', async () => {
		const editor = vscode.window.activeTextEditor
		if (!editor) {return}

		const selection = editor.selection
		const text = editor.document.getText(selection)

		if (text) {
			await vscode.commands.executeCommand('editor.action.insertLineAfter')
			const vars = text.split(',').map((v) => v.trim())
			const fmtPrintln = `fmt.Println("${text}:", ${vars.join(', ')})`

			insertFmtPrintln(fmtPrintln)
			return
		}

		insertFmtPrintln('fmt.Println("")')
	})

	context.subscriptions.push(insertFmtStatement)
}

// This method is called when your extension is deactivated
export function deactivate() {}
