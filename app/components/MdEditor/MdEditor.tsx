// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';
import './MdEditorDarkmode.css';

import { SimpleMdeReact } from 'react-simplemde-editor';
import {
	Dispatch,
	FunctionComponent,
	SetStateAction,
	useCallback,
	useEffect,
	useMemo,
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
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync';

enum ViewMode {
	Editor = 0,
	Split = 1,
	Preview = 2,
}

interface MdEditorProps {
	articleId: string;
	myArticleDocument: string;
	setMyArticleDocument: Dispatch<SetStateAction<string | undefined>>;
	saveFunction?: () => void;
}

const MdEditor: FunctionComponent<MdEditorProps> = ({
	articleId,
	myArticleDocument,
	setMyArticleDocument,
	saveFunction,
}) => {
	const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.Split);

	const onChange = useCallback(
		(value: string) => {
			if (setMyArticleDocument) setMyArticleDocument(value);
		},
		[setMyArticleDocument]
	);

	const autofocusNoSpellcheckerOptions = useMemo(() => {
		return {
			autofocus: true,
			spellChecker: false,
			placeholder: '# Escreva aqui Seu artigo\n\nUsando **markdown**...',
			// maxHeight: '70vh',
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
				{
					name: 'saveCurrent',
					action: function customFunction() {
						if (saveFunction) saveFunction();
					},
					className: 'fa fa-save',
					title: 'Salvar mudanças',
				},
			],
			shortcuts: {
				saveCurrent: 'Cmd-S',
			},
			previewImagesInEditor: true,
			status: false,
			promptURLs: true,
		} as SimpleMDE.Options;
	}, [articleId]);

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

			<ScrollSync>
				<Grid
					container
					columns={viewMode === ViewMode.Split ? 16 : 8}
					spacing={{ sm: 0, md: 1 }}
				>
					<Grid
						xs={8}
						display={
							viewMode === ViewMode.Editor ||
							viewMode === ViewMode.Split
								? 'block'
								: 'none'
						}
					>
						<Paper
							variant="outlined"
							sx={{
								overflow: 'auto',
							}}
							className="mui-tab-previewer"
						>
							<ScrollSyncPane>
								<Box
									sx={{
										height: 'calc(70vh + 60px)',
										overflowY: 'auto',
									}}
								>
									<SimpleMdeReact
										options={autofocusNoSpellcheckerOptions}
										value={myArticleDocument}
										onChange={onChange}
									/>
								</Box>
							</ScrollSyncPane>
						</Paper>
					</Grid>
					<Grid
						xs={8}
						display={
							viewMode === ViewMode.Preview ||
							viewMode === ViewMode.Split
								? 'block'
								: 'none'
						}
					>
						<Paper
							variant="outlined"
							sx={{
								overflow: 'auto',
							}}
							className="mui-tab-previewer"
						>
							<ScrollSyncPane>
								<Box
									sx={{
										p: {
											xs: 1,
											sm: 1.5,
											md: 1.5,
											lg: 2,
										},
										height: 'calc(70vh + 60px)',
										overflowY: 'auto',
									}}
								>
									<ArticleContent
										article={myArticleDocument}
									/>
								</Box>
							</ScrollSyncPane>
						</Paper>
					</Grid>
				</Grid>
			</ScrollSync>
		</Box>
	);
};

export default MdEditor;
