// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use-client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { useDebounce } from 'use-debounce';
import useQueryFilter from './useQueryFilter';

const useUpdateSearchQuery = (newValue: string) => {
	const [debouncedSearchInput] = useDebounce(newValue, 300);
	const searchParams = useSearchParams()!;
	const pathname = usePathname();
	const paths = pathname.split('/');

	const [updateFilter] = useQueryFilter();
	const isBrowse = useMemo(() => paths[1] === 'browse', [paths]);

	useEffect(() => {
		if (debouncedSearchInput !== searchParams.get('search') && isBrowse) {
			updateFilter(
				{
					tags: undefined,
					search: debouncedSearchInput,
				},
				true
			);
		}
	}, [debouncedSearchInput, updateFilter, searchParams, isBrowse]);

	return [] as const;
};

export default useUpdateSearchQuery;
