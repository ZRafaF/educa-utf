// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import ChaptersTable from '@/components/BrowseTables/ChaptersTable';

export const revalidate = 30;

export default function Page({
	params,
	searchParams,
}: {
	params: { slug: string };
	searchParams?: { [key: string]: string | string[] | undefined };
}) {
	return <ChaptersTable searchParams={searchParams} />;
}
