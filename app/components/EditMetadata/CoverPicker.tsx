// Copyright (c) 2024 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

import Box from '@mui/material/Box';
import { FunctionComponent } from 'react';
import DropZoneComponent from '../DropZoneComponent/DropZoneComponent';
import Grid from '@mui/material/Unstable_Grid2/Grid2'; // Grid version 2
import { useSearchParams } from 'next/navigation';

interface CoverPickerProps {
	overrideType: 'article' | 'chapter' | undefined;
}

const CoverPicker: FunctionComponent<CoverPickerProps> = ({ overrideType }) => {
	const searchParams = useSearchParams();
	const type = searchParams.get('type') ?? 'article';

	if (type === 'article' && overrideType !== 'chapter') return null;

	return (
		<Box px={2}>
			<DropZoneComponent />
		</Box>
	);
};

export default CoverPicker;
