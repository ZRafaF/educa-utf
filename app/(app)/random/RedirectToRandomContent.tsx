// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
'use client';

import { FunctionComponent, useEffect } from 'react';
import { getRandomArticle } from '@/lib/apiHelpers/articlesAPI';
import { useRouter } from 'next/navigation';
import { getRandomChapter } from '@/lib/apiHelpers/chaptersAPI';

interface RedirectToRandomContentProps {}

const RedirectToRandomContent: FunctionComponent<
	RedirectToRandomContentProps
> = () => {
	const router = useRouter();

	useEffect(() => {
		const getRandomContentAndRedirect = async () => {
			const routeToArticle = Math.random() < 0.5;
			const randomChapter = await getRandomChapter();
			const randomArticle = await getRandomArticle();
			let finalSlug = '/';

			// Fallbacks
			if (randomArticle.length)
				finalSlug = `/article/${randomArticle[0].id}`;
			if (randomChapter.length)
				finalSlug = `/chapter/${randomChapter[0].id}`;

			// Actual logic
			if (routeToArticle && randomArticle.length)
				finalSlug = `/article/${randomArticle[0].id}`;

			if (!routeToArticle && randomChapter.length)
				finalSlug = `/chapter/${randomChapter[0].id}`;

			router.replace(finalSlug);
		};
		getRandomContentAndRedirect();
	}, [router]);

	return <></>;
};

export default RedirectToRandomContent;
