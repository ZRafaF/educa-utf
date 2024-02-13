// Copyright (c) 2024 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
'use-client';

import { useMemo } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery/useMediaQuery';
import useTheme from '@mui/material/styles/useTheme';

const useCurrentBreakpoint = () => {
	const theme = useTheme();
	const xsMedia = useMediaQuery(theme.breakpoints.only('xs'));
	const smMedia = useMediaQuery(theme.breakpoints.only('sm'));
	const mdMedia = useMediaQuery(theme.breakpoints.only('md'));
	const lgMedia = useMediaQuery(theme.breakpoints.only('lg'));
	const xlMedia = useMediaQuery(theme.breakpoints.only('xl'));

	const breakpoint = useMemo(() => {
		if (xsMedia) return 'xs';
		if (smMedia) return 'sm';
		if (mdMedia) return 'md';
		if (lgMedia) return 'lg';
		if (xlMedia) return 'xl';

		return 'md';
	}, [xsMedia, smMedia, mdMedia, lgMedia, xlMedia]);

	return [breakpoint] as const;
};

export default useCurrentBreakpoint;
