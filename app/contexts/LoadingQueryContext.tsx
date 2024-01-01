// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
'use client';

import { Dispatch, SetStateAction, createContext } from 'react';

const LoadingQueryContext = createContext<
	[boolean, Dispatch<SetStateAction<boolean>>]
>([false, () => {}]);

export default LoadingQueryContext;
