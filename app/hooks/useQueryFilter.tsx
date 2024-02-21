// Copyright (c) 2024 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useCallback } from 'react';
import useLoadingQuery from './useLoadingQuery';

interface QueryFilters {
	tags?: string[];
	search?: string;
}

const useQueryFilter = () => {
	const pathname = usePathname();
	const searchParams = useSearchParams()!;
	const router = useRouter();
	const [updateLoadingState] = useLoadingQuery();
	const tags = searchParams.get('tag');

	const search = searchParams.get('search') ?? '';

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams);

			params.set(name, `${value}`);

			return decodeURIComponent(params.toString());
		},
		[searchParams]
	);

	/**
	 * Receives formatted filters and updates the search params
	 *
	 * Undefined values will not be updated
	 *
	 * Example: {tags: ['tag1', 'tag2']}
	 */
	const updateFilter = (filters: QueryFilters) => {
		const newSearchParams = createQueryString('tags', `${filters.tags}`);

		updateLoadingState(searchParams.toString(), newSearchParams);
		router.push(pathname + '?' + newSearchParams);
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	return [updateFilter] as const;
};

export default useQueryFilter;
