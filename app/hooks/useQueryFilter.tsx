// Copyright (c) 2024 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useCallback } from 'react';
import useLoadingQuery from './useLoadingQuery';

interface QueryFilters {
	tags: string[] | undefined;
	search: string | undefined;
}

const useQueryFilter = () => {
	const pathname = usePathname();
	const searchParams = useSearchParams()!;
	const router = useRouter();
	const [updateLoadingState] = useLoadingQuery();
	const tags = searchParams.get('tags') ?? '';

	const search = searchParams.get('search') ?? '';

	const createQueryString = useCallback(
		(values: { name: string; value: string }[]) => {
			const params = new URLSearchParams(searchParams);

			values.forEach((value) => {
				params.set(value.name, value.value);
			});

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
	const updateFilter = (filters: QueryFilters, goToPage1?: boolean) => {
		const newTags =
			filters.tags === undefined ? tags : filters.tags.join(',');
		const newSearch =
			filters.search === undefined ? search : filters.search;

		let stringQuery = [
			{ name: 'tags', value: newTags },
			{ name: 'search', value: newSearch },
		];

		if (goToPage1) {
			stringQuery.push({ name: 'page', value: '1' });
		}

		const newSearchParams = createQueryString(stringQuery);

		updateLoadingState(searchParams.toString(), newSearchParams);
		router.replace(pathname + '?' + newSearchParams);
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	return [updateFilter] as const;
};

export default useQueryFilter;
