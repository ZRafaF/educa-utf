// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Box from '@mui/material/Box/Box';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import Typography from '@mui/material/Typography';
import { FunctionComponent } from 'react';

interface PageMessageProps {
	message: string;
	loading?: boolean;
	pt?: number;
}

const PageMessage: FunctionComponent<PageMessageProps> = ({
	message,
	loading,
	pt = 10,
}) => {
	return (
		<Box
			display={'flex'}
			flexDirection={'column'}
			alignItems={'center'}
			justifyContent={'center'}
			pt={pt}
			gap={1}
		>
			<Typography variant="h5" fontWeight={500}>
				{message}
			</Typography>
			{loading && <CircularProgress />}
		</Box>
	);
};

export default PageMessage;
