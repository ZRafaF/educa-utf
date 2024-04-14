// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import ChaptersTable from '@/components/BrowseTables/ChaptersTable';
import PageMessage from '@/components/PageMessage/PageMessage';
import { constructFilterString } from '@/lib/apiHelpers/miscAPI';
import { Suspense } from 'react';

export const revalidate = 0;

export default function Page({
	params,
	searchParams,
}: {
	params: { slug: string };
	searchParams?: { [key: string]: string | string[] | undefined };
}) {
	const sort = String(searchParams?.sort ?? '-created');
	const page = Number(searchParams?.page ?? 1);
	const items = Number(searchParams?.items ?? 24);
	const filter = constructFilterString(searchParams);

	return (
		<Suspense
			key={`${sort}${page}${items}${filter}`}
			fallback={
				<PageMessage message="Buscando capítulos, aguarde..." loading />
			}
		>
			<ChaptersTable
				searchParams={searchParams}
				sort={sort}
				page={page}
				items={items}
				filter={filter}
			/>
		</Suspense>
	);
}
