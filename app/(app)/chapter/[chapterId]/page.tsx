// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
'use client';

import PageMessage from '@/components/PageMessage/PageMessage';
import { getChapterById } from '@/lib/apiHelpers/chaptersAPI';
import { FunctionComponent, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import useIsChapterEditMode from '@/hooks/useIsChapterEditMode';

interface PageProps {
	params: {
		chapterId: string;
	};
}

const Page: FunctionComponent<PageProps> = ({ params }) => {
	const chapterId = params.chapterId;
	const router = useRouter();
	const [redirecting, setRedirecting] = useState<boolean>(true);
	const searchParams = useSearchParams();
	const [isEdit] = useIsChapterEditMode();

	useEffect(() => {
		getChapterById(chapterId, true).then((chapter) => {
			if (chapter?.expand?.articles.length) {
				router.replace(
					`/chapter/${chapterId}/${chapter.expand.articles[0].id}`
				);
			} else setRedirecting(false);
		});
	}, [chapterId, setRedirecting, router, isEdit, searchParams]);

	if (redirecting)
		return <PageMessage message="Redirecionando, aguarde...." loading />;

	return <PageMessage message="Nenhum artigo encontrado." />;
};

export default Page;
