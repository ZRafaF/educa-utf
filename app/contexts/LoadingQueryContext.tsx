// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
'use client';

import { useSearchParams } from 'next/navigation';
import {
	Dispatch,
	SetStateAction,
	createContext,
	useEffect,
	useState,
} from 'react';

export const LoadingQueryContext = createContext<
	[boolean, Dispatch<SetStateAction<boolean>>]
>([false, () => {}]);

const LoadingQueryProvider = ({ children }: { children: React.ReactNode }) => {
	const [isLoading, setIsLoading] = useState(false);
	const searchParams = useSearchParams()!;
	useEffect(() => {
		setIsLoading(false);
	}, [searchParams]);
	return (
		<LoadingQueryContext.Provider value={[isLoading, setIsLoading]}>
			{children}
		</LoadingQueryContext.Provider>
	);
};

export default LoadingQueryProvider;
