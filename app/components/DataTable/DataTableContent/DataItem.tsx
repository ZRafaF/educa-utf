// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { getArticleCoverURL } from '@/lib/apiHelpers/articlesAPI';
import { getFormattedDate, getFormattedVisibility } from '@/lib/helper';
import {
	ArticlesStatsResponse,
	ChaptersStatsResponse,
} from '@/types/pocketbase-types';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { FunctionComponent } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DateRangeIcon from '@mui/icons-material/DateRange';
import Box from '@mui/material/Box';
import MoreDataOptions from './MoreDataOptions';

interface DataItemProps {
	data: ArticlesStatsResponse | ChaptersStatsResponse;
}

const DataItem: FunctionComponent<DataItemProps> = ({ data }) => {
	const CoverImg: JSX.Element =
		'cover' in data ? (
			<Avatar
				src={getArticleCoverURL(data)}
				variant="square"
				sx={{ width: 34, height: 34 }}
			></Avatar>
		) : (
			<></>
		);
	const NumOfArticles: JSX.Element =
		'cover' in data ? (
			<></>
		) : (
			<Typography
				component="p"
				fontWeight={600}
				color="text.secondary"
				fontSize={'small'}
				display={'inline'}
				noWrap
			>
				&nbsp;•&nbsp;{data.articles.length} artigo(s)
			</Typography>
		);

	return (
		<Stack
			direction="row"
			spacing={1}
			py={1}
			px={1}
			alignItems="center"
			sx={{
				':hover': {
					bgcolor: 'action.hover',
				},
			}}
		>
			{CoverImg}
			<Stack direction="column" width={'100%'}>
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
					spacing={1}
				>
					<Box display={'flex'}>
						<Typography
							component="p"
							color={
								data.visibility === 'public'
									? 'text.primary'
									: 'text.secondary'
							}
							fontWeight={700}
						>
							{data.title}
							{NumOfArticles}
						</Typography>
					</Box>
				</Stack>
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
					spacing={1}
				>
					<Stack
						direction="row"
						alignItems="center"
						width={'30%'}
						justifyContent="space-between"
						spacing={1}
					>
						<Tooltip title="Visualizações" arrow>
							<Stack
								direction="row"
								alignItems="center"
								color="text.secondary"
								width="fit-content"
							>
								<VisibilityIcon
									sx={{
										fontSize: 'small',
									}}
								/>
								&nbsp;
								<Typography
									variant="subtitle2"
									component="p"
									fontSize={'small'}
									fontWeight={600}
								>
									{data.views}
								</Typography>
							</Stack>
						</Tooltip>
						<Tooltip title="Likes" arrow>
							<Stack
								direction="row"
								alignItems="center"
								width="fit-content"
								color="text.secondary"
							>
								<FavoriteIcon
									sx={{
										fontSize: 'small',
									}}
								/>
								&nbsp;
								<Typography
									variant="subtitle2"
									component="p"
									fontSize={'small'}
									fontWeight={600}
								>
									{data.likes}
								</Typography>
							</Stack>
						</Tooltip>
					</Stack>

					<Tooltip title="Criado em" arrow>
						<Stack
							direction="row"
							alignItems="center"
							width="fit-content"
							color="text.secondary"
						>
							<DateRangeIcon
								sx={{
									fontSize: 'small',
								}}
							/>
							&nbsp;
							<Typography
								variant="subtitle2"
								component="p"
								fontSize={'small'}
								fontWeight={600}
							>
								{getFormattedDate(data.created)}
							</Typography>
						</Stack>
					</Tooltip>
					<Tooltip title="Visibilidade" arrow>
						<Typography
							variant="subtitle2"
							component="p"
							fontWeight={600}
							color={
								data.visibility === 'public'
									? 'success.main'
									: 'text.secondary'
							}
						>
							{getFormattedVisibility(data.visibility)}
						</Typography>
					</Tooltip>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default DataItem;
