// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.

import ChaptersTable from '@/components/BrowseTables/ChaptersTable';

// https://opensource.org/licenses/MIT
export default function Page({
	params,
	searchParams,
}: {
	params: { slug: string };
	searchParams?: { [key: string]: string | string[] | undefined };
}) {
	return <ChaptersTable searchParams={searchParams} />;
}
