// Copyright (c) 2024 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { FunctionComponent } from 'react';

interface DummyCardProps {
	type: 'chapter' | 'article';
}

const DummyCard: FunctionComponent<DummyCardProps> = ({ type }) => {
	if (type === 'article')
		return (
			<Box
				sx={{
					p: 1,
					borderRadius: 3,
					border: '1px solid var(--mui-palette-divider)',
				}}
				display={'flex'}
				flexDirection={'column'}
				gap={1}
			>
				<Skeleton animation="wave" height={25} width="64%" />
				<Stack
					direction="column"
					justifyContent="center"
					gap={1}
					width={'100%'}
				>
					<Box
						minHeight={65}
						sx={{
							display: 'flex',
						}}
					>
						<Stack
							direction={'row'}
							justifyContent={'space-between'}
							alignItems={'start'}
							width={'stretch'}
							spacing={1}
						>
							<Stack width={'100%'} minHeight={0}>
								<Box
									display={'flex'}
									justifyContent={'space-between'}
									alignItems={'center'}
									width={'100%'}
									pb={2}
								>
									<Skeleton
										animation="wave"
										height={20}
										width="30%"
									/>
									<Skeleton
										animation="wave"
										height={20}
										width="20%"
									/>

									<Skeleton
										animation="wave"
										height={20}
										width="20%"
									/>

									<Skeleton
										animation="wave"
										height={20}
										width="20%"
									/>
								</Box>
								<Box height={'100%'}>
									<Skeleton
										animation="wave"
										height={15}
										width="100%"
									/>
									<Skeleton
										animation="wave"
										height={15}
										width="80%"
									/>
								</Box>
							</Stack>
						</Stack>
					</Box>

					<Stack
						direction={'row'}
						justifyContent={'space-between'}
						alignItems={'center'}
						width={'100%'}
						gap={0.5}
					>
						<Box
							overflow={'auto'}
							width={'100%'}
							display={'flex'}
							gap={1}
						>
							<Skeleton
								animation="wave"
								variant="rounded"
								width="40%"
							/>
							<Skeleton
								animation="wave"
								variant="rounded"
								width="20%"
							/>
						</Box>

						<Box>
							<Skeleton
								animation="wave"
								variant="circular"
								height={24}
								width={24}
							/>
						</Box>
					</Stack>
				</Stack>
			</Box>
		);

	return (
		<Card variant="outlined">
			<Box>
				<Skeleton
					sx={{ height: 'auto', aspectRatio: '2/1' }}
					width={'100%'}
					animation="wave"
					variant="rectangular"
				/>
				<CardContent
					sx={{
						p: 1,
					}}
				>
					<Stack
						direction="column"
						justifyContent="space-between"
						alignItems="start"
						minHeight={80}
						useFlexGap
					>
						<Box
							display={'flex'}
							width={'100%'}
							justifyContent={'space-between'}
						>
							<Skeleton
								animation="wave"
								width="30%"
								height={15}
							/>
							<Skeleton
								animation="wave"
								width="45%"
								height={15}
							/>
						</Box>
						<Skeleton animation="wave" height={25} width="100%" />
						<Skeleton animation="wave" height={25} width="50%" />
					</Stack>
				</CardContent>
			</Box>
			<Divider />
			<CardActions
				sx={{
					p: 0.5,
					height: 38,
				}}
			>
				<Stack
					direction={'row'}
					justifyContent={'space-between'}
					alignItems={'center'}
					width={'100%'}
					gap={0.5}
				>
					<Box
						overflow={'auto'}
						width={'100%'}
						display={'flex'}
						gap={1}
					>
						<Skeleton
							animation="wave"
							variant="rounded"
							width="60%"
						/>
						<Skeleton
							animation="wave"
							variant="rounded"
							width="30%"
						/>
					</Box>

					<Box>
						<Skeleton
							animation="wave"
							variant="circular"
							height={24}
							width={24}
						/>
					</Box>
				</Stack>
			</CardActions>
		</Card>
	);
};

export default DummyCard;
