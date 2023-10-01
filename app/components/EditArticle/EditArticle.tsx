// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
'use client';

import { FunctionComponent } from 'react';
import ArticleContent from '@/components/ArticleComponent/ArticleContent/ArticleContent';
import { ChangeEvent, useRef } from 'react';
import MdEditor from 'react-markdown-editor-lite';

interface EditArticleProps {}

const EditArticle: FunctionComponent<EditArticleProps> = () => {
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
		//console.log('handleEditorChange', html, text);
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
			<MdEditor
				style={{
					display: 'flex',
					flexGrow: 1,
					height: '90vh',
					borderRadius: 10,
					overflow: 'hidden',
				}}
				renderHTML={(text) => <ArticleContent article={text} />}
				onChange={handleEditorChange}
				allowPasteImage
				onImageUpload={handleImageUpload}
				onCustomImageUpload={onCustomImageUpload}
			/>
		</>
	);
};

export default EditArticle;
