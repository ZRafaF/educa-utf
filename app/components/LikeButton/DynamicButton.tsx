// Copyright (c) 2024 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

import { FunctionComponent, useMemo, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import usePbAuth from '@/hooks/usePbAuth';
import { toast } from 'react-toastify';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import { updateLikedRecords } from '@/lib/apiHelpers/miscAPI';
import { UsersResponse } from '@/types/pocketbase-types';
import Stack from '@mui/material/Stack';

interface DynamicButtonProps {
	numberOfLikes?: number;
	item?: {
		id: string;
		type: 'articles' | 'chapters';
	};
}

const DynamicButton: FunctionComponent<DynamicButtonProps> = ({
	numberOfLikes,
	item,
}) => {
	const [_, user] = usePbAuth();

	const [userRecord, setUserRecord] = useState<UsersResponse | null>(user);
	const [dynamicLikes, setDynamicLikes] = useState<number | undefined>(
		numberOfLikes
	);
	const userHasLiked = useMemo<boolean>(() => {
		if (!userRecord || !item) return false;

		if (item.type === 'articles') {
			return userRecord.liked_articles.includes(item.id);
		} else if (item.type === 'chapters') {
			return userRecord.liked_chapters.includes(item.id);
		}
		return false;
	}, [userRecord, item]);

	if (dynamicLikes === undefined || userRecord === null)
		return (
			<Tooltip title="Visualizações" arrow placement="left">
				<Stack direction="row" spacing={1} alignItems="center" pl={1}>
					<FavoriteIcon color="action" />
					<Typography variant="subtitle2" component="p">
						{numberOfLikes}
					</Typography>
				</Stack>
			</Tooltip>
		);

	const handleLike = async () => {
		if (!userRecord || !item) return false;

		try {
			const response = await updateLikedRecords(
				item.id,
				item.type,
				userHasLiked ? 'remove' : 'add'
			);
			setDynamicLikes(response.likes);
			setUserRecord(response.userRecord);
		} catch (error) {
			toast.error('Erro ao atualizar curtida: ' + error);
			console.error(error);
		}
	};

	return (
		<Box display="flex">
			<Tooltip title="Gosteis" arrow placement="left">
				<Box display="flex" alignItems="center">
					<IconButton
						color={userHasLiked ? 'error' : 'default'}
						onClick={() => {
							handleLike();
						}}
						disabled={!userRecord}
					>
						{userHasLiked ? (
							<FavoriteIcon color="error" />
						) : (
							<FavoriteBorderIcon color="action" />
						)}
					</IconButton>
					<Typography variant="subtitle2" component="p">
						{dynamicLikes}
					</Typography>
				</Box>
			</Tooltip>
		</Box>
	);
};

export default DynamicButton;
