// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
'use client';

import './MarkdownEditorComponent.css';
import {
	ComponentType,
	Dispatch,
	FunctionComponent,
	SetStateAction,
	Suspense,
} from 'react';
import { ChangeEvent, useRef } from 'react';
import 'react-markdown-editor-lite/lib/index.css';
import dynamic from 'next/dynamic';

import Editor, { Plugins } from 'react-markdown-editor-lite';

const ArticleContent = dynamic(
	() => import('@/components/ArticleComponent/ArticleContent/ArticleContent')
);

Editor.addLocale('pt_BR', {
	btnHeader: 'Títulos',
	btnClear: 'Apagar tudo',
	btnBold: 'Negrito',
	btnItalic: 'Itálico',
	btnUnderline: 'Sublinhado',
});
Editor.useLocale('pt_BR');
Editor.use(Plugins.TabInsert);

const plugins = [
	'header',
	'font-bold',
	'font-italic',
	'font-underline',
	'font-strikethrough',
	'list-unordered',
	'list-ordered',
	'block-quote',
	'block-wrap',
	'block-code-inline',
	'block-code-block',
	'table',
	'image',
	'link',
	'clear',
	'logger',
	'mode-toggle',
	'tab-insert',
];

interface MarkdownEditorComponentProps {
	myArticleDocument: string;
	setMyArticleDocument: Dispatch<SetStateAction<string | undefined>>;
}

const MarkdownEditorComponent: FunctionComponent<
	MarkdownEditorComponentProps
> = ({ myArticleDocument, setMyArticleDocument }) => {
	const inputFile = useRef<HTMLInputElement | null>(null);
	const promiseResolveRef =
		useRef<(value: { url: string; text?: string | undefined }) => void>();

	const promiseRejectRef = useRef<(reason?: any) => void>();

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files?.[0];

		if (selectedFile) {
			readFileContent(selectedFile)
				.then((content) => {
					if (promiseResolveRef.current) {
						promiseResolveRef.current({
							url: content,
						});
					}
				})
				.catch((error) => {
					if (promiseRejectRef.current)
						promiseRejectRef.current(
							new Error(`Promessa não cumprida, erro:`, error)
						);
					console.error('Error reading file:', error);
				});
		}
	};

	const readFileContent = (file: File): Promise<string> => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();

			reader.onload = (event) => {
				const content = event.target?.result as string;
				resolve(content);
			};

			reader.onerror = (event) => {
				reject(event.target?.error);
			};

			reader.readAsDataURL(file);
			//reader.readAsBinaryString(file)
		});
	};

	function handleEditorChange({
		text,
		html,
	}: {
		text: string;
		html: string;
	}) {
		setMyArticleDocument(text);
	}

	const handleImageUpload = (file: any) => {
		return new Promise((resolve) => {
			const reader = new FileReader();
			reader.onload = (data) => {
				if (data.target) resolve(data.target.result);
			};
			reader.readAsDataURL(file);
		});
	};

	const onCustomImageUpload = async (
		event: any
	): Promise<{ url: string; text?: string | undefined }> => {
		inputFile.current?.click();
		return new Promise((resolve, reject) => {
			promiseResolveRef.current = resolve;
			promiseRejectRef.current = reject;
		});
	};

	return (
		<>
			<input
				type="file"
				id="file"
				ref={inputFile}
				style={{ display: 'none' }}
				onChange={handleFileChange}
			/>
			<Editor
				style={{
					display: 'flex',
					flexGrow: 1,
					height: '90vh',
					borderRadius: 10,
					overflow: 'hidden',
				}}
				plugins={plugins}
				renderHTML={(text) => <ArticleContent article={text} />}
				onChange={handleEditorChange}
				allowPasteImage
				defaultValue={myArticleDocument}
				onImageUpload={handleImageUpload}
				onCustomImageUpload={onCustomImageUpload}
			/>
		</>
	);
};

export default MarkdownEditorComponent;
