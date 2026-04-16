import * as vscode from 'vscode';
import { ConvertSettings, SETTING_KEYS, convertText } from './converter';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand('zenhanConverter.convert', () => runConvert()),
    );
}

function readSettings(): ConvertSettings {
    const config = vscode.workspace.getConfiguration('zenhanConverter');
    const settings: Partial<ConvertSettings> = {};
    for (const key of SETTING_KEYS) {
        settings[key] = config.get<string>(key, 'そのまま') as ConvertSettings[typeof key];
    }
    return settings as ConvertSettings;
}

async function runConvert(): Promise<void> {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }

    const doc = editor.document;
    const ext = doc.fileName.toLowerCase();
    if (!ext.endsWith('.txt') && !ext.endsWith('.md')) {
        return;
    }

    const settings = readSettings();

    const selections = editor.selections;
    const hasSelection = selections.some(s => !s.isEmpty);

    if (!hasSelection) {
        const answer = await vscode.window.showWarningMessage(
            'ファイル全体を変換対象にしますか？',
            { modal: true },
            'はい'
        );
        if (answer !== 'はい') {
            return;
        }
    }

    let totalCount = 0;
    const editSuccess = await editor.edit(editBuilder => {
        if (hasSelection) {
            for (const sel of selections) {
                if (sel.isEmpty) {
                    continue;
                }
                const text = doc.getText(sel);
                const { result, count } = convertText(text, settings);
                if (count > 0) {
                    editBuilder.replace(sel, result);
                    totalCount += count;
                }
            }
        } else {
            const fullRange = new vscode.Range(
                doc.positionAt(0),
                doc.positionAt(doc.getText().length)
            );
            const text = doc.getText(fullRange);
            const { result, count } = convertText(text, settings);
            if (count > 0) {
                editBuilder.replace(fullRange, result);
                totalCount += count;
            }
        }
    });

    if (editSuccess) {
        vscode.window.setStatusBarMessage(`${totalCount}文字を変換しました`, 5000);
    }
}

export function deactivate() {}
