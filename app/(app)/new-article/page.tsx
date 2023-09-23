// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
'use client';
import ArticleContent from '@/components/ArticleComponent/ArticleContent/ArticleContent';
import Container from '@mui/material/Container/Container';
import Paper from '@mui/material/Paper/Paper';
import Typography from '@mui/material/Typography/Typography';
import { ChangeEvent, useRef } from 'react';
import MdEditor from 'react-markdown-editor-lite';
import Grid from '@mui/material/Unstable_Grid2/Grid2'; // Grid version 2

import 'react-markdown-editor-lite/lib/index.css';
import TextField from '@mui/material/TextField/TextField';
import FormControlLabel from '@mui/material/FormControlLabel/FormControlLabel';
import Checkbox from '@mui/material/Checkbox/Checkbox';
import Button from '@mui/material/Button/Button';
import Box from '@mui/material/Box/Box';
import Radio from '@mui/material/Radio/Radio';
import FormLabel from '@mui/material/FormLabel/FormLabel';
import RadioGroup from '@mui/material/RadioGroup/RadioGroup';
import Stack from '@mui/material/Stack/Stack';

export default function Page() {
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
		<Container maxWidth={'lg'} sx={{ py: 4, flexGrow: 1 }}>
			<input
				type="file"
				id="file"
				ref={inputFile}
				style={{ display: 'none' }}
				onChange={handleFileChange}
			/>
			<Paper
				elevation={0}
				variant="outlined"
				sx={{ mb: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
			>
				<Typography
					component="h1"
					variant="h4"
					align="center"
					gutterBottom
				>
					Criar novo artigo
				</Typography>
				<Typography variant="h6" gutterBottom>
					Informações básicas
				</Typography>
				<Grid container spacing={3}>
					<Grid xs={12} md={6}>
						<Stack
							direction="column"
							justifyContent="center"
							alignItems="center"
							spacing={2}
						>
							<TextField
								required
								id="article-title"
								label="Titulo do artigo..."
								helperText="Máximo de 64 carácteres"
								inputProps={{
									minLength: 1,
									maxLength: 64,
								}}
								fullWidth
								autoComplete="article-name"
							/>
							<TextField
								required
								id="article-tag"
								label="Tags..."
								helperText="Tags devem ser em minusculo e separadas por espaço"
								fullWidth
								autoComplete="article-tag"
							/>
						</Stack>
					</Grid>
					<Grid xs={12} md={6}>
						<TextField
							id="article-description"
							label="Descrição do artigo..."
							helperText="Máximo de 256 carácteres"
							inputProps={{
								maxLength: 256,
							}}
							fullWidth
							multiline
							rows={5}
							autoComplete="article-description"
						/>
					</Grid>

					<Grid xs={12}>
						<Stack
							direction="row"
							justifyContent="space-between"
							alignItems="center"
							spacing={2}
						>
							<Box>
								<FormLabel id="visibility-radio-buttons">
									Visibilidade
								</FormLabel>
								<RadioGroup
									aria-labelledby="visibility-radio-buttons"
									defaultValue="public"
									name="visibility-radio-buttons"
								>
									<FormControlLabel
										value="public"
										control={<Radio size="small" />}
										label="Publico"
									/>
									<FormControlLabel
										value="private"
										control={<Radio size="small" />}
										label="Privado"
									/>
								</RadioGroup>
							</Box>

							<Button type="submit" variant="contained">
								Criar
							</Button>
						</Stack>
					</Grid>
				</Grid>
			</Paper>
			<Typography variant="h6" gutterBottom>
				Artigo
			</Typography>

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
		</Container>
	);
}
