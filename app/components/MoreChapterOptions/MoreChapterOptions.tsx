// Copyright (c) 2024 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
'use client';

import { FunctionComponent, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import usePbAuth from '@/hooks/usePbAuth';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import {
	ChaptersResponse,
	ChaptersStatsResponse,
} from '@/types/pocketbase-types';
import ShareIcon from '@mui/icons-material/Share';
import ReportIcon from '@mui/icons-material/Report';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import Box from '@mui/material/Box';
import { useRouter } from 'next/navigation';
import { deleteChapter } from '@/lib/apiHelpers/chaptersAPI';

interface MoreChapterOptionsProps {
	chapter: ChaptersResponse | ChaptersStatsResponse;
	shareUrl: string;
	placement: 'left' | 'right';
	size: 'small' | 'medium';
}

const MoreChapterOptions: FunctionComponent<MoreChapterOptionsProps> = ({
	chapter,
	shareUrl,
	placement,
	size,
}) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const [, user] = usePbAuth();
	const router = useRouter();

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
		event.stopPropagation();
		event.preventDefault();
	};
	const handleClose = (event?: React.MouseEvent) => {
		if (event) {
			event.stopPropagation();
			event.preventDefault();
		}

		setAnchorEl(null);
	};

	return (
		<>
			<Box>
				<Tooltip title="Mais opções" arrow placement="right">
					<IconButton onClick={handleClick} size="small">
						<MoreVertIcon color="action" fontSize={size} />
					</IconButton>
				</Tooltip>
			</Box>
			<Menu
				anchorEl={anchorEl}
				id="more-post-options-menu"
				open={open}
				keepMounted
				onClose={(e: unknown) => {
					handleClose(
						e as React.MouseEvent<HTMLLIElement, MouseEvent>
					);
				}}
				disableScrollLock
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: placement === 'left' ? 'right' : 'left',
				}}
			>
				<MenuList
					sx={{
						py: 0,
						minWidth: '250px',
					}}
				>
					<Tooltip
						title="Compartilhar capítulo"
						arrow
						placement="right"
					>
						<MenuItem
							onClick={(e) => {
								navigator.share({
									title: `Olhe esse capitulo que encontrei no EducaUTF!`,
									text: `Ele se chama ${chapter.title}`,
									url: shareUrl,
								});
								handleClose(e);
							}}
							sx={{
								py: 1,
							}}
						>
							<ListItemIcon>
								<ShareIcon />
							</ListItemIcon>
							<ListItemText>Compartilhar</ListItemText>
						</MenuItem>
					</Tooltip>

					<Tooltip
						title={
							<span style={{ whiteSpace: 'pre-line' }}>
								{
									'Fazer cópia do capítulo \n (Você precisa estar logado)'
								}
							</span>
						}
						arrow
						placement="right"
					>
						<Box
							onClick={(e) => {
								if (user === null) handleClose(e);
							}}
						>
							<MenuItem
								sx={{
									py: 1,
								}}
								disabled={user === null}
								onClick={(e) => {
									handleClose(e);
								}}
							>
								<ListItemIcon>
									<FileCopyIcon />
								</ListItemIcon>
								<ListItemText>Copiar</ListItemText>
							</MenuItem>
						</Box>
					</Tooltip>
					<Divider />
					<Tooltip
						title={
							<span style={{ whiteSpace: 'pre-line' }}>
								{
									'Reportar esse capítulo \n (Você precisa estar logado)'
								}
							</span>
						}
						arrow
						placement="right"
					>
						<Box
							onClick={(e) => {
								if (user === null) handleClose(e);
							}}
						>
							<MenuItem
								sx={{
									color: 'warning.main',
									py: 1,
								}}
								disabled={user === null}
								onClick={(e) => {
									handleClose(e);
								}}
							>
								<ListItemIcon>
									<ReportIcon color="warning" />
								</ListItemIcon>
								<ListItemText>Reportar</ListItemText>
							</MenuItem>
						</Box>
					</Tooltip>
				</MenuList>
				{chapter.user === user?.id && (
					<MenuList
						sx={{
							mb: -1,
							bgcolor: 'grey.A700',
						}}
					>
						<Divider>Opções do autor</Divider>
						<Tooltip
							title="Editar capítulo"
							arrow
							placement="right"
						>
							<MenuItem
								onClick={(e) => {
									router.push(
										`/chapter/${chapter.id}?edit=true`
									);
									handleClose(e);
								}}
								sx={{
									py: 1,
								}}
							>
								<ListItemIcon>
									<EditIcon />
								</ListItemIcon>
								<ListItemText>Editar</ListItemText>
							</MenuItem>
						</Tooltip>
						<Divider />
						<Tooltip
							title="Excluir esse capítulo"
							arrow
							placement="right"
						>
							<MenuItem
								sx={{
									color: 'error.main',
									py: 1,
								}}
								onClick={(e) => {
									if (
										window.confirm(
											'Você tem certeza que deseja excluir esse capítulo?'
										)
									) {
										deleteChapter(chapter.id)
											.then((success) => {
												if (success)
													toast.success(
														'Capítulo excluído com sucesso!'
													);
												else
													toast.error(
														'Erro ao excluir capítulo!'
													);
											})
											.catch((error) => {
												toast.error(error.message);
											});
									}
									handleClose(e);
								}}
							>
								<ListItemIcon>
									<DeleteIcon color="error" />
								</ListItemIcon>
								<ListItemText>Excluir</ListItemText>
							</MenuItem>
						</Tooltip>
					</MenuList>
				)}
			</Menu>
		</>
	);
};

export default MoreChapterOptions;
