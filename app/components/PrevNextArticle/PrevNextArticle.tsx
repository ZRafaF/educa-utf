// Copyright (c) 2024 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

import { FunctionComponent, useEffect, useMemo, useState } from 'react';
import Stack from '@mui/material/Stack';
import { ChaptersResponse } from '@/types/pocketbase-types';
import { ChaptersExpand } from '@/types/expanded-types';
import RedirectButton from './RedirectButton';
import { getChapterById } from '@/lib/apiHelpers/chaptersAPI';

interface PrevNextArticleProps {
	chapterId: string;
	articleId: string;
}

const PrevNextArticle: FunctionComponent<PrevNextArticleProps> = ({
	chapterId,
	articleId,
}) => {
	const [chapter, setChapter] = useState<
		ChaptersResponse<ChaptersExpand> | undefined
	>(undefined);

	const myIdx = useMemo(() => {
		if (chapter === undefined) return -1;
		return chapter.articles.findIndex((element) => element === articleId);
	}, [chapter, articleId]);

	useEffect(() => {
		getChapterById(chapterId, true).then((chapter) => setChapter(chapter));
	}, [chapterId]);

	if (chapter === undefined || myIdx === -1) return <></>;

	const prevArticle =
		myIdx > 0 ? chapter.expand?.articles[myIdx - 1] : undefined;
	const nextArticle =
		myIdx < chapter.articles.length - 1
			? chapter.expand?.articles[myIdx + 1]
			: undefined;

	return (
		<Stack
			direction="row"
			justifyContent="space-between"
			alignItems="center"
			py={2}
			spacing={1}
		>
			<RedirectButton
				chapter={chapter}
				article={prevArticle}
				variant="prev"
			/>

			<RedirectButton
				chapter={chapter}
				article={nextArticle}
				variant="next"
			/>
		</Stack>
	);
};

export default PrevNextArticle;
