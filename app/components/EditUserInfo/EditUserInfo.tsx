// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

import { FunctionComponent, useState } from 'react';
import EditUserInfoContent from './EditUserInfoContent';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

interface EditUserInfoProps {}

const EditUserInfo: FunctionComponent<EditUserInfoProps> = () => {
	const [open, setOpen] = useState(false);

	const handleClick = () => {
		setOpen((old) => !old);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<ListItemButton
				onClick={() => {
					handleClick();
				}}
			>
				<ListItemIcon>
					<ManageAccountsIcon />
				</ListItemIcon>
				<ListItemText
					primary={'Minhas informações'}
					sx={{
						ml: -1.5,
					}}
				/>
			</ListItemButton>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Editar meu perfil</DialogTitle>
				<DialogContent>
					<EditUserInfoContent />
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} variant="outlined">
						Cancelar
					</Button>
					<Button onClick={handleClose} autoFocus variant="contained">
						Salvar
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default EditUserInfo;
