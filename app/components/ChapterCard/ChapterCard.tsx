// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { ChaptersResponse } from '@/types/pocketbase-types';
import CardActionArea from '@mui/material/CardActionArea/CardActionArea';
import Stack from '@mui/material/Stack/Stack';
import Typography from '@mui/material/Typography/Typography';
import Link from 'next/link';
import { FunctionComponent } from 'react';
import TagsComponent from '../TagsComponent/TagsComponent';
import { ChaptersExpandTags } from '@/types/expanded-types';
import Box from '@mui/material/Box/Box';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import MoreOptions from '../MoreOptions/MoreOptions';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface ChapterCardProps {
	idx: number;
	myChapter: ChaptersResponse<ChaptersExpandTags>;
}

const ChapterCard: FunctionComponent<ChapterCardProps> = ({
	idx,
	myChapter,
}) => {
	return (
		<CardActionArea
			LinkComponent={Link}
			href={`chapter/${myChapter.id}`}
			sx={{ p: 2, borderRadius: 3 }}
		>
			<Grid container gap={2}>
				<Grid>
					<Box
						height={'100%'}
						sx={{
							display: 'flex',
							alignItems: 'center',
						}}
					>
						<Typography
							variant="h2"
							fontWeight="700"
							color={'#E0E0E0'}
						>
							{idx + 1}
						</Typography>
					</Box>
				</Grid>
				<Grid xs>
					<Stack
						direction="column"
						justifyContent="center"
						gap={1}
						width={'100%'}
					>
						<Box
							minHeight={50}
							sx={{
								display: 'flex',
								alignItems: 'center',
							}}
						>
							<Stack
								direction={'row'}
								justifyContent={'space-between'}
								alignItems={'center'}
								width={'stretch'}
							>
								<Typography
									variant="body1"
									fontWeight="700"
									sx={{
										overflow: 'hidden',
										wordBreak: 'break',
										textOverflow: 'ellipsis',
										display: '-webkit-box',
										WebkitLineClamp: '2',
										WebkitBoxOrient: 'vertical',
									}}
								>
									{myChapter.title}
								</Typography>
								<MoreOptions />
							</Stack>
						</Box>
						<Stack
							direction={'row'}
							justifyContent={'space-between'}
							alignItems={'center'}
							width={'stretch'}
							gap={1}
						>
							<TagsComponent tags={myChapter.expand?.tags} />
							<Stack direction="row" gap={1} alignItems="center">
								<VisibilityIcon
									color="action"
									fontSize="small"
								/>
								<Typography variant="caption">
									{myChapter.views}
								</Typography>
							</Stack>
						</Stack>
					</Stack>
				</Grid>
			</Grid>
		</CardActionArea>
	);
};

export default ChapterCard;
