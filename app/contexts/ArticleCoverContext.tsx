// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

import {
	Dispatch,
	FunctionComponent,
	ReactNode,
	SetStateAction,
	createContext,
	useState,
} from 'react';

export const ArticleCoverContext = createContext<
	[File | undefined, Dispatch<SetStateAction<File | undefined>>]
>([undefined, () => {}]);

interface ArticleCoverProps {
	children: ReactNode;
}

const ArticleCoverProvider: FunctionComponent<ArticleCoverProps> = ({
	children,
}) => {
	const [cover, setCover] = useState<File | undefined>(undefined);
	return (
		<ArticleCoverContext.Provider value={[cover, setCover]}>
			{children}
		</ArticleCoverContext.Provider>
	);
};

export default ArticleCoverProvider;
