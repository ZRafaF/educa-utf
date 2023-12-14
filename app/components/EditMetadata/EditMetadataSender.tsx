// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

import useSendMetadata from '@/hooks/useSendMetadata';
import Paper from '@mui/material/Paper/Paper';
import { FunctionComponent, ReactNode } from 'react';

interface EditMetadataSenderProps {
	children: ReactNode;
}

const EditMetadataSender: FunctionComponent<EditMetadataSenderProps> = ({
	children,
}) => {
	const [handleSubmit] = useSendMetadata('create');

	return (
		<Paper
			elevation={0}
			variant="outlined"
			sx={{ mb: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
			component="form"
			onSubmit={handleSubmit}
		>
			{children}
		</Paper>
	);
};

export default EditMetadataSender;
