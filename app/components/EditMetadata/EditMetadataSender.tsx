// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

import ArticleCoverContext from '@/contexts/ArticleCoverContext';
import usePbAuth from '@/hooks/usePbAuth';
import { createArticle } from '@/lib/apiHelpers/articlesAPI';
import { ArticlesVisibilityOptions } from '@/types/pocketbase-types';
import Paper from '@mui/material/Paper/Paper';
import { useRouter } from 'next/navigation';
import { FunctionComponent, ReactNode, useState } from 'react';
import { toast } from 'react-toastify';
import PageMessage from '../PageMessage/PageMessage';

interface EditMetadataSenderProps {
	children: ReactNode;
}

const EditMetadataSender: FunctionComponent<EditMetadataSenderProps> = ({
	children,
}) => {
	const [selectedFile, setSelectedFile] = useState<File>();

	const [, user] = usePbAuth();
	const router = useRouter();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data: FormData = new FormData(event.currentTarget);
		const submitTitle = data.get('article-title')?.toString();
		const submitTag = data.get('article-tag')?.toString();
		const submitDescription = data.get('article-description')?.toString();

		const getVis = () => {
			const visibRaw = data.get('visibility-radio-buttons')?.toString();
			switch (visibRaw) {
				case 'public':
					return ArticlesVisibilityOptions.public;
				case 'private':
					return ArticlesVisibilityOptions.private;

				default:
					return ArticlesVisibilityOptions.public;
			}
		};

		const submitVisibility = getVis();

		if (submitTitle === undefined) {
			toast.error('Titulo inválido!');
			return;
		}

		if (submitTag === undefined) {
			toast.error('Tags inválidas!');
			return;
		}

		if (submitDescription === undefined) {
			toast.error('Descrição inválida');
			return;
		}

		if (user === null) {
			toast.error('Você precisa estar logado!');
			return;
		}

		try {
			const baseFile = new Blob([''], { type: 'text/markdown' });

			const newRecord = await createArticle(
				{
					title: submitTitle,
					user: user.id,
					description: submitDescription,
					visibility: submitVisibility,
				},
				baseFile,
				selectedFile
			);

			router.push(`/edit/${newRecord.id}`);
		} catch (error) {
			if (error instanceof Error) {
				console.error(error);
				switch (error.message) {
					case 'Failed to create record.':
						toast.error('Falha ao criar o artigo');
						break;

					default:
						toast.error(error.message);
						break;
				}
			}
		}
	};

	return (
		<Paper
			elevation={0}
			variant="outlined"
			sx={{ mb: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
			component="form"
			onSubmit={handleSubmit}
		>
			<ArticleCoverContext.Provider
				value={[selectedFile, setSelectedFile]}
			>
				{children}
			</ArticleCoverContext.Provider>
		</Paper>
	);
};

export default EditMetadataSender;
