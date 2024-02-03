// Copyright (c) 2024 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import PageMessage from '@/components/PageMessage/PageMessage';
import Image from 'next/image';
import { FunctionComponent } from 'react';
import emptyStateImage from './vecteezy_new-file-empty-state-single-isolated-icon-with-flat-style_11537831.svg';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface PageProps {}

const Page: FunctionComponent<PageProps> = () => {
	return (
		<Box display={'flex'} width={'100%'} justifyContent={'center'} py={8}>
			<div>
				<Image
					src={emptyStateImage}
					alt="Empty State"
					height={400}
					style={{
						opacity: 0.35,
						filter: 'grayscale(100%)',
						objectFit: 'cover',
					}}
				/>
				<Typography
					variant="h5"
					fontWeight={500}
					color={'GrayText'}
					textAlign={'center'}
				>
					Você está editando um capítulo...
				</Typography>
			</div>
		</Box>
	);
};

export default Page;
