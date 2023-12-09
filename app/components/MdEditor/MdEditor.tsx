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
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import EditNoteIcon from '@mui/icons-material/EditNote';
import VerticalSplitIcon from '@mui/icons-material/VerticalSplit';
import PreviewIcon from '@mui/icons-material/Preview';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';

enum ViewMode {
	Editor = 0,
	Split = 1,
	Preview = 2,
}

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
	const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.Split);

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
				'upload-image',
				'undo',
				'redo',
				'|',
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
		<Box>
			<Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
				<Tabs
					value={viewMode}
					onChange={(
						event: React.SyntheticEvent,
						newValue: number
					) => {
						setViewMode(newValue as ViewMode);
					}}
					aria-label="basic tabs example"
				>
					<Tooltip title="Editar" arrow placement="bottom">
						<Tab icon={<EditNoteIcon />} />
					</Tooltip>
					<Tooltip title="Dividir" arrow placement="bottom">
						<Tab icon={<VerticalSplitIcon />} />
					</Tooltip>

					<Tooltip title="Visualizar" arrow placement="bottom">
						<Tab icon={<PreviewIcon />} />
					</Tooltip>
				</Tabs>
			</Box>

			<Grid
				container
				columns={viewMode === ViewMode.Split ? 16 : 8}
				spacing={{ sm: 0, md: 1 }}
			>
				{(viewMode === ViewMode.Editor ||
					viewMode === ViewMode.Split) && (
					<Grid xs={8}>
						<SimpleMdeReact
							options={autofocusNoSpellcheckerOptions}
							value={myArticleDocument}
							onChange={onChange}
							style={{
								zIndex: isFullscreen
									? '999999 !important'
									: 'inherit',
							}}
						/>
					</Grid>
				)}
				<Grid xs={8}>
					<Paper
						variant="outlined"
						sx={{
							overflow: 'hidden',
						}}
						className="mui-tab-previewer"
					>
						<Box
							sx={{
								p: 2,
								height: 'calc(70vh + 60px)',
								overflowY: 'scroll',
							}}
						>
							<ArticleContent article={myArticleDocument} />
						</Box>
					</Paper>
				</Grid>
			</Grid>
		</Box>
	);
};

export default MdEditor;
