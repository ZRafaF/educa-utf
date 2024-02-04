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
	ChaptersResponse,
	ChaptersVisibilityOptions,
	TagsResponse,
	UsersResponse,
} from '@/types/pocketbase-types';
import { useRouter } from 'next/navigation';

import { toast } from 'react-toastify';
import usePbAuth from './usePbAuth';
import { ArticlesExpand, ChaptersExpand } from '@/types/expanded-types';
import { createKeyWord, getKeyWord } from '@/lib/apiHelpers/keyWordsAPI';
import { createChapter } from '@/lib/apiHelpers/chaptersAPI';

const useSendMetadata = ({
	type,
	resourceType,
	myArticle,
	myArticleDocument,
	myChapter,
	myChapterCover,
}: {
	type: 'create' | 'update';
	resourceType: 'article' | 'chapter';
	myArticle?: ArticlesResponse<ArticlesExpand>;
	myArticleDocument?: string;
	myChapter?: ChaptersResponse<ChaptersExpand>;
	myChapterCover?: File | Blob;
}) => {
	const [, user] = usePbAuth();
	const router = useRouter();
	const localizedName = resourceType === 'article' ? 'Artigo' : 'Capítulo';

	const handleError = (toastId: string | number, error: unknown) => {
		if (error instanceof Error) {
			console.error(error);
			switch (error.message) {
				case 'Failed to create record.':
					toast.update(toastId, {
						render: `Falha ao salvar o ${localizedName}!`,
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

	const handleCreate = async (
		toastId: string | number,
		submitTitle: string,
		submitDescription: string,
		submitVisibility: ArticlesVisibilityOptions | ChaptersVisibilityOptions,
		author: UsersResponse,
		fetchedTag: TagsResponse,
		keywords: string[]
	) => {
		console.log(resourceType);

		if (resourceType === 'article') {
			const baseFile = new Blob([''], { type: 'text/markdown' });

			const newRecord = await createArticle(
				{
					title: submitTitle,
					user: author.id,
					description: submitDescription,
					visibility: submitVisibility as ArticlesVisibilityOptions,
					document: '',
					tag: fetchedTag.id,
				},
				baseFile,
				keywords
			);
			toast.update(toastId, {
				render: `Artigo criado com sucesso!`,
				type: 'success',
				isLoading: false,
				autoClose: 5000,
				pauseOnFocusLoss: true,
				draggable: true,
				pauseOnHover: true,
				closeOnClick: true,
			});
			router.push(`/edit-article/${newRecord.id}`);
		} else {
			let coverFile = myChapterCover;
			if (coverFile === undefined) {
				const res = await fetch(
					`/api/chapter-cover?tag=${fetchedTag.category}`
				);
				coverFile = await res.blob();
				console.log(coverFile);
			}
			if (coverFile === undefined) {
				throw new Error('capa inválida inválido!');
			}
			const newRecord = await createChapter(
				{
					title: submitTitle,
					user: author.id,
					description: submitDescription,
					visibility: submitVisibility as ChaptersVisibilityOptions,
					tag: fetchedTag.id,
				},
				coverFile,
				keywords
			);
			toast.update(toastId, {
				render: `Capítulo criado com sucesso!`,
				type: 'success',
				isLoading: false,
				autoClose: 5000,
				pauseOnFocusLoss: true,
				draggable: true,
				pauseOnHover: true,
				closeOnClick: true,
			});
			router.push(`/chapter/${newRecord.id}/edit`);
		}
	};

	const handleUpdateArticle = async (
		toastId: string | number,
		submitTitle: string,
		submitDescription: string,
		submitVisibility: ArticlesVisibilityOptions | ChaptersVisibilityOptions,
		author: UsersResponse,
		fetchedTag: TagsResponse,
		keywords: string[]
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
				visibility: submitVisibility as ArticlesVisibilityOptions,
				tag: fetchedTag.id,
				document: '',
			},
			baseFile,
			keywords
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
		const submitTitle = data.get('title')?.toString();
		const submitTag = data.get('tag-picker')?.toString();
		const submitTagCategory = data.get('tag-category')?.toString();
		const submitDescription = data.get('description')?.toString();

		const submitKeyWords = data.get('keywords')?.toString();
		const keywords = submitKeyWords?.split(',');

		const getVis = () => {
			const visibRaw = data.get('visibility')?.toString();
			switch (visibRaw) {
				case 'public':
					return resourceType === 'article'
						? ArticlesVisibilityOptions.public
						: ChaptersVisibilityOptions.public;
				case 'private':
					return resourceType === 'article'
						? ArticlesVisibilityOptions.private
						: ChaptersVisibilityOptions.private;
			}

			const visibRadioRaw = data
				.get('visibility-radio-buttons')
				?.toString();
			switch (visibRadioRaw) {
				case 'public':
					return resourceType === 'article'
						? ArticlesVisibilityOptions.public
						: ChaptersVisibilityOptions.public;
				case 'private':
					return resourceType === 'article'
						? ArticlesVisibilityOptions.private
						: ChaptersVisibilityOptions.private;
				default:
					return resourceType === 'article'
						? ArticlesVisibilityOptions.public
						: ChaptersVisibilityOptions.public;
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
			} o ${localizedName}, aguarde...`
		);

		try {
			const fetchedTag = await getTagByFilter(
				submitTag,
				submitTagCategory
			);

			const listOfKeyWordsId = await (async () => {
				let listOfKeyWordsId: string[] = [];

				if (keywords === undefined) return listOfKeyWordsId;

				for (let i = 0; i < keywords.length; i++) {
					const word = keywords[i];
					if (word.length === 0) continue;
					try {
						const keyWord = await getKeyWord(word);
						listOfKeyWordsId.push(keyWord.id);
					} catch (error) {
						if (error instanceof Error) {
							if (
								error.message ===
								"The requested resource wasn't found."
							) {
								try {
									const createdKeyWord = await createKeyWord(
										word,
										user.id
									);
									listOfKeyWordsId.push(createdKeyWord.id);
								} catch (error) {
									handleError(id, error);
								}
							} else {
								handleError(id, error);
							}
						}
					}
				}

				return listOfKeyWordsId;
			})();

			if (type === 'create') {
				await handleCreate(
					id,
					submitTitle,
					submitDescription,
					submitVisibility,
					user,
					fetchedTag,
					listOfKeyWordsId
				);
			} else {
				const updatedRecord = await handleUpdateArticle(
					id,
					submitTitle,
					submitDescription,
					submitVisibility,
					user,
					fetchedTag,
					listOfKeyWordsId
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
