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

import { FunctionComponent, useEffect, useState } from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import React from 'react';
import Link from 'next/link';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import usePbAuth from '@/hooks/usePbAuth';
import { logOut } from '@/lib/apiHelpers/authAPI';
import LogoutIcon from '@mui/icons-material/Logout';

interface ProfileButtonProps {}

const ProfileButton: FunctionComponent<ProfileButtonProps> = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const isMenuOpen = Boolean(anchorEl);
	const handleMenuClose = () => {
		setAnchorEl(null);
	};
	const [token, user] = usePbAuth();

	useEffect(() => {
		console.log('token');
		console.log(token);
		console.log('usr');
		console.log(user);
	}, [token, user]);

	const LoggedInMenu = () => (
		<React.Fragment>
			<MenuItem
				onClick={() => {
					console.log('token');
					console.log(token);
					console.log('usr');
					console.log(user);
				}}
			>
				<ListItemIcon>
					<PersonAddIcon fontSize="small" />
				</ListItemIcon>
				<ListItemText>print</ListItemText>
			</MenuItem>
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
				style={{ textDecoration: 'none', color: 'white' }}
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
				style={{ textDecoration: 'none', color: 'white' }}
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
			keepMounted
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<ListItem>
				<Typography variant="caption">
					Olá:
					<Typography>{user ? user?.name : 'Visitante'}</Typography>
				</Typography>
			</ListItem>
			<Divider />
			{user ? <LoggedInMenu /> : <LoggedOutMenu />}
		</Menu>
	);

	return (
		<React.Fragment>
			<Tooltip title="Meu perfil" arrow>
				<IconButton
					size="large"
					edge="end"
					aria-label="account of current user"
					aria-controls={menuId}
					aria-haspopup="true"
					onClick={handleProfileMenuOpen}
					color="inherit"
				>
					<AccountCircle />
				</IconButton>
			</Tooltip>
			{renderMenu}
		</React.Fragment>
	);
};

export default ProfileButton;
