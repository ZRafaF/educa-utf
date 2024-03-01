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
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import {
	ArticlesResponse,
	ArticlesStatsResponse,
	ReportsTypeOptions,
} from '@/types/pocketbase-types';
import ShareIcon from '@mui/icons-material/Share';
import ReportIcon from '@mui/icons-material/Report';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import Box from '@mui/material/Box';
import {
	deleteArticle,
	getArticleDocumentUrl,
} from '@/lib/apiHelpers/articlesAPI';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';

interface MoreArticleOptionsProps {
	article: ArticlesResponse | ArticlesStatsResponse;
	shareUrl: string | undefined;
	placement: 'left' | 'right';
	size?: 'small' | 'medium';
}

const MoreArticleOptions: FunctionComponent<MoreArticleOptionsProps> = ({
	article,
	shareUrl,
	placement,
	size = 'medium',
}) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const [, user] = usePbAuth();
	const router = useRouter();
	const downloadUrl = getArticleDocumentUrl(article);

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
				<Tooltip title="Mais opções" arrow placement={placement}>
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
					<ListItem>
						<Typography
							color="text.secondary"
							variant="subtitle2"
							component="p"
						>
							ID: <b>{article.id}</b>
						</Typography>
					</ListItem>
					<Divider />
					<Tooltip
						title="Compartilhar artigo"
						arrow
						placement={placement}
					>
						<MenuItem
							onClick={(e) => {
								navigator.share({
									title: `${article.title}`,
									text: `Olhe esse artigo que encontrei no EducaUTF!`,
									url: shareUrl
										? shareUrl
										: window.location.protocol,
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
						title="Baixar artigo em MarkDown"
						arrow
						placement={placement}
					>
						<MenuItem
							sx={{
								py: 1,
							}}
							onClick={(e) => {
								window.open(
									downloadUrl,
									'_blank',
									'noopener,noreferrer'
								);

								handleClose(e);
							}}
						>
							<ListItemIcon>
								<SimCardDownloadIcon />
							</ListItemIcon>
							<ListItemText>Baixar</ListItemText>
						</MenuItem>
					</Tooltip>

					<Tooltip
						title={
							<span style={{ whiteSpace: 'pre-line' }}>
								{
									'Adicionar artigo a um capítulo \n (Você precisa estar logado)'
								}
							</span>
						}
						arrow
						placement={placement}
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
									<LibraryAddIcon />
								</ListItemIcon>
								<ListItemText>Adicionar</ListItemText>
							</MenuItem>
						</Box>
					</Tooltip>
					<Divider />
					<Tooltip
						title={'Reportar esse artigo'}
						arrow
						placement={placement}
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
								onClick={(e) => {
									handleClose(e);
									router.push(
										`/report?type=${ReportsTypeOptions.Artigo}&id=${article.id}`
									);
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
				{article.user === user?.id && (
					<MenuList
						sx={{
							mb: -1,
							bgcolor: 'grey.A700',
						}}
					>
						<Divider>Opções do autor</Divider>
						<Tooltip
							title="Editar artigo"
							arrow
							placement={placement}
						>
							<MenuItem
								onClick={(e) => {
									router.push(`/edit-article/${article.id}`);
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
							title="Excluir esse artigo"
							arrow
							placement={placement}
						>
							<MenuItem
								sx={{
									color: 'error.main',
									py: 1,
								}}
								onClick={(e) => {
									if (
										window.confirm(
											'Você tem certeza que deseja excluir esse artigo?'
										)
									) {
										deleteArticle(article.id)
											.then((success) => {
												if (success)
													toast.success(
														'Artigo excluído com sucesso!'
													);
												else
													toast.error(
														'Erro ao excluir artigo!'
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

export default MoreArticleOptions;
