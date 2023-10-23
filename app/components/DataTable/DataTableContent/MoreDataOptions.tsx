// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

import {
	ArticlesStatsResponse,
	ChaptersStatsResponse,
} from '@/types/pocketbase-types';
import { FunctionComponent, useMemo, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import Link from 'next/link';
import Tooltip from '@mui/material/Tooltip';
import usePbAuth from '@/hooks/usePbAuth';
import ShareIcon from '@mui/icons-material/Share';
import Box from '@mui/material/Box';

interface MoreDataOptionsProps {
	data: ArticlesStatsResponse | ChaptersStatsResponse;
}

const MoreDataOptions: FunctionComponent<MoreDataOptionsProps> = ({ data }) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const [, user] = usePbAuth();

	const isChapter = useMemo<boolean>(() => 'cover' in data, [data]);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const editButton = !isChapter && (
		<Link
			href={`/edit/${data.id}`}
			style={{ textDecoration: 'none', color: 'inherit' }}
		>
			<MenuItem onClick={handleClose}>
				<ListItemIcon>
					<EditIcon fontSize="small" />
				</ListItemIcon>
				<ListItemText>Editar</ListItemText>
			</MenuItem>
		</Link>
	);

	return (
		<>
			<Tooltip title={'Mais opções'} arrow placement="left">
				<IconButton
					aria-label="more-options"
					size="small"
					onMouseDown={(event) => event.stopPropagation()}
					onClick={handleClick}
					aria-haspopup="true"
					aria-controls={open ? 'basic-menu' : undefined}
					aria-expanded={open ? 'true' : undefined}
					sx={{ mr: 1 }}
				>
					<MoreVertIcon fontSize="medium" />
				</IconButton>
			</Tooltip>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
			>
				<MenuItem
					onClick={() => {
						const shareUrl = isChapter
							? `https://educautf.td.utfpr.edu.br/article/${data.id}`
							: `https://educautf.td.utfpr.edu.br/article/${data.id}`;

						navigator.share({
							title: `${data.title} - EducaUTF`,
							text: `Aqui: ${data.description}`,
							url: shareUrl,
						});

						handleClose();
					}}
				>
					<ListItemIcon>
						<ShareIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText>Compartilhar</ListItemText>
				</MenuItem>
				<Box>
					{user?.id === data.user && (
						<>
							<Divider />

							{editButton}
							<MenuItem
								onClick={handleClose}
								sx={{ color: 'error.main' }}
							>
								<ListItemIcon>
									<DeleteIcon
										fontSize="small"
										color="error"
									/>
								</ListItemIcon>
								<ListItemText>Apagar</ListItemText>
							</MenuItem>
						</>
					)}
				</Box>
			</Menu>
		</>
	);
};

export default MoreDataOptions;
