// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

import IconButton from '@mui/material/IconButton/IconButton';
import Tooltip from '@mui/material/Tooltip/Tooltip';
import MenuItem from '@mui/material/MenuItem/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon/ListItemIcon';
import ListItemText from '@mui/material/ListItemText/ListItemText';
import ListItem from '@mui/material/ListItem/ListItem';
import Divider from '@mui/material/Divider/Divider';
import Typography from '@mui/material/Typography/Typography';
import Menu from '@mui/material/Menu/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';

import { FunctionComponent, useState } from 'react';
import React from 'react';
import Link from 'next/link';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import usePbAuth from '@/hooks/usePbAuth';
import { logOut } from '@/lib/apiHelpers/authAPI';
import LogoutIcon from '@mui/icons-material/Logout';

import dynamic from 'next/dynamic';
const NoSSRProfileAvatar = dynamic(() => import('./ProfileAvatar'), {
	ssr: true,
});

interface ProfileButtonProps {}

const ProfileButton: FunctionComponent<ProfileButtonProps> = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
		event.stopPropagation();
	};
	const isMenuOpen = Boolean(anchorEl);
	const handleMenuClose = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(null);
		event.stopPropagation();
	};
	const [, user] = usePbAuth();

	const LoggedInMenu = () => (
		<React.Fragment>
			<Link
				href={`/profile/${user?.username}`}
				style={{ textDecoration: 'none', color: 'inherit' }}
			>
				<MenuItem onClick={handleMenuClose}>
					<ListItemIcon>
						<AccountCircle fontSize="small" />
					</ListItemIcon>
					<ListItemText>Meu perfil</ListItemText>
				</MenuItem>
			</Link>
			<MenuItem
				onClick={() => {
					logOut();
				}}
			>
				<ListItemIcon>
					<LogoutIcon fontSize="small" />
				</ListItemIcon>
				<ListItemText>Sair</ListItemText>
			</MenuItem>
		</React.Fragment>
	);

	const LoggedOutMenu = () => (
		<React.Fragment>
			<Link
				href={'/login'}
				style={{ textDecoration: 'none', color: 'inherit' }}
			>
				<MenuItem onClick={handleMenuClose}>
					<ListItemIcon>
						<LoginIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText>Login</ListItemText>
				</MenuItem>
			</Link>
			<Link
				href={'/register'}
				style={{ textDecoration: 'none', color: 'inherit' }}
			>
				<MenuItem onClick={handleMenuClose}>
					<ListItemIcon>
						<PersonAddIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText>Registrar</ListItemText>
				</MenuItem>
			</Link>
		</React.Fragment>
	);

	const menuId = 'primary-search-account-menu';
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			id={menuId}
			open={isMenuOpen}
			keepMounted
			onClose={handleMenuClose}
			data-mui-color-scheme="dark"
			disableScrollLock
		>
			<ListItem>
				<Typography variant="caption" maxWidth={500}>
					Olá:
					<Link
						href={user ? `/profile/${user.username}` : '/'}
						style={{ textDecoration: 'none', color: 'white' }}
					>
						<Typography>
							{user ? user?.name : 'Visitante'}
						</Typography>
					</Link>
				</Typography>
			</ListItem>
			<Divider />
			{user ? <LoggedInMenu /> : <LoggedOutMenu />}
		</Menu>
	);

	return (
		<React.Fragment>
			<Tooltip title="Perfil" arrow>
				<IconButton
					edge="end"
					aria-label="account of current user"
					aria-controls={menuId}
					aria-haspopup="true"
					color="inherit"
					onClick={handleProfileMenuOpen}
				>
					<NoSSRProfileAvatar user={user} />
				</IconButton>
			</Tooltip>
			{renderMenu}
		</React.Fragment>
	);
};

export default ProfileButton;
