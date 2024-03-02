// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use-client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import useQueryFilter from './useQueryFilter';

const useUpdateSearchQuery = (
	newValue: string,
	callback?: (debouncedVal: string) => void
) => {
	const [debouncedSearchInput] = useDebounce(newValue, 300);
	const searchParams = useSearchParams()!;
	const pathname = usePathname();
	const paths = pathname.split('/');

	const [updateFilter] = useQueryFilter();
	const isBrowse = paths[1] === 'browse';

	useEffect(() => {
		if (debouncedSearchInput !== searchParams.get('search') && isBrowse) {
			updateFilter(
				{
					tags: undefined,
					search: debouncedSearchInput,
				},
				true
			);
			if (callback) callback(debouncedSearchInput);
		}
	}, [debouncedSearchInput, updateFilter, searchParams]);

	return [] as const;
};

export default useUpdateSearchQuery;
