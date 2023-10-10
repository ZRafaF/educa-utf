// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
'use client';

import './MarkdownEditorComponent.css';
import { Dispatch, FunctionComponent, SetStateAction } from 'react';
import { ChangeEvent, useRef } from 'react';
import 'react-markdown-editor-lite/lib/index.css';
import dynamic from 'next/dynamic';

import Editor, { Plugins } from 'react-markdown-editor-lite';
import {
	attachFile,
	getAttachmentFileURL,
} from '@/lib/apiHelpers/attachmentsAPI';
import { toast } from 'react-toastify';

const ArticleContent = dynamic(
	() => import('@/components/ArticleComponent/ArticleContent/ArticleContent')
);

const EDITOR_PLUGINS = [
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
	articleId: string;
	myArticleDocument: string;
	setMyArticleDocument: Dispatch<SetStateAction<string | undefined>>;
}

const MarkdownEditorComponent: FunctionComponent<
	MarkdownEditorComponentProps
> = ({ articleId, myArticleDocument, setMyArticleDocument }) => {
	Editor.addLocale('pt_BR', {
		btnHeader: 'Títulos',
		btnClear: 'Apagar tudo',
		btnBold: 'Negrito',
		btnItalic: 'Itálico',
		btnUnderline: 'Sublinhado',
	});
	Editor.useLocale('pt_BR');
	Editor.use(Plugins.TabInsert, {
		tabMapValue: 1,
	});

	const inputFile = useRef<HTMLInputElement | null>(null);
	const promiseResolveRef =
		useRef<(value: { url: string; text?: string | undefined }) => void>();

	const promiseRejectRef = useRef<(reason?: any) => void>();

	const uploadFile = async (file: File) => {
		const id = toast.loading('Fazendo upload do arquivo, aguarde...');

		try {
			const attachmentsRecord = await attachFile(articleId, file);

			const imageUrl = await getAttachmentFileURL(
				articleId,
				attachmentsRecord.files[attachmentsRecord.files.length - 1],
				true
			);
			toast.update(id, {
				render: 'Arquivo enviado com sucesso!',
				type: 'success',
				isLoading: false,
				autoClose: 5000,
				pauseOnFocusLoss: true,
				draggable: true,
				pauseOnHover: true,
				closeOnClick: true,
			});
			return imageUrl;
		} finally {
			toast.update(id, {
				render: 'Arquivo enviado com sucesso!',
				type: 'success',
				isLoading: false,
				autoClose: 5000,
				pauseOnFocusLoss: true,
				draggable: true,
				pauseOnHover: true,
				closeOnClick: true,
			});
		}
	};

	const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files?.[0];

		if (selectedFile && promiseResolveRef.current) {
			try {
				const imageUrl = await uploadFile(selectedFile);
				promiseResolveRef.current({
					text: selectedFile.name,
					url: imageUrl,
				});
			} catch (error) {
				if (promiseRejectRef.current)
					promiseRejectRef.current(
						new Error(
							`Promessa não cumprida, erro:`,
							error as ErrorOptions
						)
					);
				console.error('Error reading file:', error);
			}
		}
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

	const handleImageUpload = (file: File) => {
		return new Promise(async (resolve) => {
			const imageUrl = await uploadFile(file);

			resolve(imageUrl);
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
					height: '85vh',
					borderRadius: 10,
					overflow: 'hidden',
				}}
				plugins={EDITOR_PLUGINS}
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
