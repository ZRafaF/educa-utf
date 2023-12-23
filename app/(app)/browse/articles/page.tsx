// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import ArticlesTable from '@/components/BrowseTables/ArticlesTable';

export const revalidate = 86400;

export default function Page({
	params,
	searchParams,
}: {
	params: { slug: string };
	searchParams?: { [key: string]: string | string[] | undefined };
}) {
	return <ArticlesTable searchParams={searchParams} />;
}
