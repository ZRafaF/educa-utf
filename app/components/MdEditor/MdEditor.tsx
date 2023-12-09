// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';
import './MdEditorDarkmode.css';
import ReactDOMServer from 'react-dom/server';

import { SimpleMdeReact } from 'react-simplemde-editor';
import {
	Dispatch,
	FunctionComponent,
	SetStateAction,
	useCallback,
	useMemo,
	useRef,
	useState,
} from 'react';
import 'easymde/dist/easymde.min.css';
import SimpleMDE from 'easymde';
import { uploadFile } from '@/lib/fileHelper';
import ArticleContent from '../ArticleComponent/ArticleContent/ArticleContent';

interface MdEditorProps {
	articleId: string;
	myArticleDocument: string;
	setMyArticleDocument: Dispatch<SetStateAction<string | undefined>>;
}

const MdEditor: FunctionComponent<MdEditorProps> = ({
	articleId,
	myArticleDocument,
	setMyArticleDocument,
}) => {
	const editorRef = useRef();

	const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

	const onChange = useCallback((value: string) => {
		if (setMyArticleDocument) setMyArticleDocument(value);
	}, []);

	const autofocusNoSpellcheckerOptions = useMemo(() => {
		return {
			autofocus: true,
			spellChecker: false,
			placeholder: '# Escreva aqui Seu artigo\n\nUsando **markdown**...',
			maxHeight: '70vh',
			uploadImage: true,
			imageUploadFunction(file, onSuccess, onError) {
				uploadFile(file, articleId)
					.then((url) => {
						onSuccess(url);
					})
					.catch((error) => {
						onError(error);
					});
			},
			horizontalRule: false,
			toolbar: [
				'heading',
				'bold',
				'italic',
				'strikethrough',
				'|',
				'quote',
				'code',
				'table',
				'horizontal-rule',
				'link',
				'|',
				'preview',
				'side-by-side',
				'|',
				'upload-image',
				'undo',
				'redo',
				'guide',
			],
			promptURLs: true,
			onToggleFullScreen(goingIntoFullScreen) {
				setIsFullscreen(goingIntoFullScreen);
			},

			sideBySideFullscreen: false,

			previewClass: 'custom-preview-class',

			previewRender: (plainText) => {
				return ReactDOMServer.renderToString(
					<ArticleContent article={plainText} />
				);
			},

			// previewRender: (plainText, preview) => {
			// 	// Async method
			// 	setTimeout(() => {
			// 		preview.innerHTML = ReactDOMServer.renderToString(
			// 			<ArticleContent article={myArticleDocument} />
			// 		);
			// 	}, 500);
			// 	// If you return null, the innerHTML of the preview will not
			// 	// be overwritten. Useful if you control the preview node's content via
			// 	// vdom diffing.
			// 	// return null;

			// 	return 'Loading...';
			// },
		} as SimpleMDE.Options;
	}, []);

	return (
		<>
			<SimpleMdeReact
				options={autofocusNoSpellcheckerOptions}
				value={myArticleDocument}
				onChange={onChange}
				style={{
					zIndex: isFullscreen ? '999999 !important' : 'inherit',
				}}
			/>
		</>
	);
};

export default MdEditor;
