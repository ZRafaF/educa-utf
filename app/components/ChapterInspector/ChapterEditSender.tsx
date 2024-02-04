// Copyright (c) 2024 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

import { ArticleCoverContext } from '@/contexts/ArticleCoverContext';
import useSendMetadata from '@/hooks/useSendMetadata';
import { ChaptersExpand } from '@/types/expanded-types';
import { ChaptersResponse } from '@/types/pocketbase-types';
import { FunctionComponent, ReactNode, useContext } from 'react';

interface ChapterEditSenderProps {
	children: ReactNode;
	chapter: ChaptersResponse<ChaptersExpand>;
	editedChapter: ChaptersResponse<ChaptersExpand>;
}

const ChapterEditSender: FunctionComponent<ChapterEditSenderProps> = ({
	children,
	chapter,
	editedChapter,
}) => {
	const [selectedCoverFile] = useContext(ArticleCoverContext);

	const [handleSubmitUpdate] = useSendMetadata({
		type: 'update',
		resourceType: 'article',
		myChapter: chapter,
		myChapterCover: selectedCoverFile,
	});

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data: FormData = new FormData(event.currentTarget);
		const submitTitle = data.get('title')?.toString();
		const submitTag = data.get('tag-picker')?.toString();
		const submitTagCategory = data.get('tag-category')?.toString();
		const submitDescription = data.get('description')?.toString();

		console.log(
			`submitTitle: ${submitTitle}, submitTag: ${submitTag}, submitTagCategory: ${submitTagCategory}, submitDescription: ${submitDescription}`
		);
	};

	return (
		<form onSubmit={handleSubmit}>
			{children}{' '}
			<input
				name="title"
				value={editedChapter.title}
				style={{
					display: 'none',
				}}
			/>
			<input
				name="description"
				value={editedChapter.description}
				style={{
					display: 'none',
				}}
			/>
			<input
				name="visibility"
				value={editedChapter.visibility}
				style={{
					display: 'none',
				}}
			/>
		</form>
	);
};

export default ChapterEditSender;
