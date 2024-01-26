// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
'use client';

import PageMessage from '@/components/PageMessage/PageMessage';
import { getChapterById } from '@/lib/apiHelpers/chaptersAPI';
import { FunctionComponent, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

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
	const isEdit = Boolean(searchParams.get('edit'));

	useEffect(() => {
		getChapterById(chapterId, true).then((chapter) => {
			if (chapter?.expand?.articles.length) {
				router.replace(
					`/chapter/${chapterId}/${chapter.expand.articles[0].id}${
						isEdit ? `?edit=${searchParams.get('edit')}` : ''
					}`
				);
			} else setRedirecting(false);
		});
	}, [chapterId, setRedirecting, router]);

	if (redirecting)
		return <PageMessage message="Redirecionando, aguarde...." loading />;

	return <PageMessage message="Nenhum artigo encontrado." />;
};

export default Page;
