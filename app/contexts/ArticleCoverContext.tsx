// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

import { Dispatch, SetStateAction, createContext } from 'react';

export const ArticleCoverContext = createContext<
	[File | undefined, Dispatch<SetStateAction<File | undefined>>]
>([undefined, () => {}]);

export default ArticleCoverContext;
