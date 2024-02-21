// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
'use-client';

import { LoadingQueryContext } from '@/contexts/LoadingQueryContext';
import { useContext } from 'react';

const useLoadingQuery = () => {
	const [_, setIsLoading] = useContext(LoadingQueryContext);

	const updateLoadingState = (
		oldSearchParams: string,
		newSearchParams: string
	) => {
		console.log(
			decodeURIComponent(oldSearchParams) !==
				decodeURIComponent(newSearchParams)
		);

		if (
			decodeURIComponent(oldSearchParams) !==
			decodeURIComponent(newSearchParams)
		)
			setIsLoading(true);
	};

	return [updateLoadingState] as const;
};

export default useLoadingQuery;
