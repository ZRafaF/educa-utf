// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use-client';

import { createArticle, updateArticle } from '@/lib/apiHelpers/articlesAPI';
import { getTagByFilter } from '@/lib/apiHelpers/tagsAPI';
import {
	ArticlesResponse,
	ArticlesVisibilityOptions,
	TagsResponse,
	UsersResponse,
} from '@/types/pocketbase-types';
import { useRouter } from 'next/navigation';

import { toast } from 'react-toastify';
import usePbAuth from './usePbAuth';
import { ArticlesExpand } from '@/types/expanded-types';

const useSendMetadata = (
	type: 'create' | 'update',
	myArticle?: ArticlesResponse<ArticlesExpand>,
	myArticleDocument?: string
) => {
	const [, user] = usePbAuth();
	const router = useRouter();

	const handleError = (toastId: string | number, error: unknown) => {
		if (error instanceof Error) {
			console.error(error);
			switch (error.message) {
				case 'Failed to create record.':
					toast.update(toastId, {
						render: 'Falha ao salvar o artigo!',
						type: 'error',
						isLoading: false,
						autoClose: 5000,
						pauseOnFocusLoss: true,
						draggable: true,
						pauseOnHover: true,
						closeOnClick: true,
					});

					break;

				default:
					toast.update(toastId, {
						render: 'Algo deu errado!',
						type: 'error',
						isLoading: false,
						autoClose: 5000,
						pauseOnFocusLoss: true,
						draggable: true,
						pauseOnHover: true,
						closeOnClick: true,
					});
					toast.error(error.message);
					break;
			}
		}
	};

	const handleCreateArticle = async (
		toastId: string | number,
		submitTitle: string,
		submitDescription: string,
		submitVisibility: ArticlesVisibilityOptions,
		author: UsersResponse,
		fetchedTag: TagsResponse
	) => {
		const baseFile = new Blob([''], { type: 'text/markdown' });

		const newRecord = await createArticle(
			{
				title: submitTitle,
				user: author.id,
				description: submitDescription,
				visibility: submitVisibility,
				document: '',
				tag: fetchedTag.id,
			},
			baseFile
		);
		toast.update(toastId, {
			render: 'Artigo criado com sucesso!',
			type: 'success',
			isLoading: false,
			autoClose: 5000,
			pauseOnFocusLoss: true,
			draggable: true,
			pauseOnHover: true,
			closeOnClick: true,
		});

		router.push(`/edit/${newRecord.id}`);
	};

	const handleUpdateArticle = async (
		toastId: string | number,
		submitTitle: string,
		submitDescription: string,
		submitVisibility: ArticlesVisibilityOptions,
		author: UsersResponse,
		fetchedTag: TagsResponse
	) => {
		if (myArticle === undefined || myArticleDocument === undefined) {
			throw new Error('Artigo ou documento inválido!');
		}

		const baseFile = new Blob([myArticleDocument], {
			type: 'text/markdown',
		});

		const updatedRecord = await updateArticle(
			myArticle?.id,
			{
				title: submitTitle,
				user: author.id,
				description: submitDescription,
				visibility: submitVisibility,
				tag: fetchedTag.id,
				document: '',
			},
			baseFile
		);

		toast.update(toastId, {
			render: 'Artigo atualizado com sucesso!',
			type: 'success',
			isLoading: false,
			autoClose: 5000,
			pauseOnFocusLoss: true,
			draggable: true,
			pauseOnHover: true,
			closeOnClick: true,
		});

		return updatedRecord;
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data: FormData = new FormData(event.currentTarget);
		const submitTitle = data.get('article-title')?.toString();
		const submitTag = data.get('tag-picker')?.toString();
		const submitTagCategory = data.get('tag-category')?.toString();
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

		const saveAndFinish =
			(event as any).nativeEvent.submitter.name === 'saveAndFinish';

		if (submitTitle === undefined) {
			toast.error('Titulo inválido!');
			return;
		}

		if (submitDescription === undefined) {
			toast.error('Descrição inválida');
			return;
		}

		if (submitTag === undefined) {
			toast.error('Tag inválida');
			return;
		}

		if (submitTagCategory === undefined) {
			toast.error('Categoria da tag inválida');
			return;
		}

		if (user === null) {
			toast.error('Você precisa estar logado!');
			return;
		}
		const id = toast.loading(
			`${
				type === 'create' ? 'Criando' : 'Atualizando'
			} o artigo, aguarde...`
		);

		try {
			const fetchedTag = await getTagByFilter(
				submitTag,
				submitTagCategory
			);

			if (type === 'create') {
				await handleCreateArticle(
					id,
					submitTitle,
					submitDescription,
					submitVisibility,
					user,
					fetchedTag
				);
			} else {
				const updatedRecord = await handleUpdateArticle(
					id,
					submitTitle,
					submitDescription,
					submitVisibility,
					user,
					fetchedTag
				);
				if (saveAndFinish) router.push(`/article/${updatedRecord.id}`);
			}
		} catch (error) {
			handleError(id, error);
		}
	};

	return [handleSubmit] as const;
};

export default useSendMetadata;
