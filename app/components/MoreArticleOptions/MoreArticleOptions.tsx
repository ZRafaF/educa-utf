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
} from '@/types/pocketbase-types';
import { ArticlesExpand } from '@/types/expanded-types';
import ShareIcon from '@mui/icons-material/Share';
import ReportIcon from '@mui/icons-material/Report';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import Box from '@mui/material/Box';
import { getArticleDocumentUrl } from '@/lib/apiHelpers/articlesAPI';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface MoreArticleOptionsProps {
	article:
		| ArticlesResponse<ArticlesExpand>
		| ArticlesResponse
		| ArticlesStatsResponse<ArticlesExpand>;
	shareUrl?: string;
	placement: 'left' | 'right';
}

const MoreArticleOptions: FunctionComponent<MoreArticleOptionsProps> = ({
	article,
	shareUrl,
	placement,
}) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const [, user] = usePbAuth();

	const downloadUrl = getArticleDocumentUrl(article);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
		event.stopPropagation();
		event.preventDefault();
	};
	const handleClose = (
		event?:
			| React.MouseEvent<HTMLButtonElement>
			| React.MouseEvent<HTMLLIElement, MouseEvent>
	) => {
		if (event) {
			event.stopPropagation();
			event.preventDefault();
		}

		setAnchorEl(null);
	};

	return (
		<>
			<Tooltip title="Mais opções" arrow placement="right">
				<IconButton onClick={handleClick} size="small">
					<MoreVertIcon color="action" />
				</IconButton>
			</Tooltip>
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
						title="Compartilhar artigo"
						arrow
						placement="right"
					>
						<MenuItem
							onClick={(e) => {
								navigator.share({
									title: `Olhe esse artigo que encontrei no EducaUTF!`,
									text: `Ele se chama ${article.title}`,
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
						placement="right"
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
						placement="right"
					>
						<Box>
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
						title="Reportar esse artigo"
						arrow
						placement="right"
					>
						<MenuItem
							sx={{
								color: 'warning.main',
								py: 1,
							}}
							onClick={(e) => {
								handleClose(e);
							}}
						>
							<ListItemIcon>
								<ReportIcon color="warning" />
							</ListItemIcon>
							<ListItemText>Reportar</ListItemText>
						</MenuItem>
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
						<Tooltip title="Editar artigo" arrow placement="right">
							<MenuItem
								onClick={(e) => {
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
							placement="right"
						>
							<MenuItem
								sx={{
									color: 'error.main',
									py: 1,
								}}
								onClick={(e) => {
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
