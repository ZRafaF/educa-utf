// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

import { FunctionComponent, useState } from 'react';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import EditUserInfoDialog from './EditUserInfoDialog/EditUserInfoDialog';
import usePbAuth from '@/hooks/usePbAuth';

interface EditUserInfoProps {}

const EditUserInfo: FunctionComponent<EditUserInfoProps> = () => {
	const [open, setOpen] = useState(false);
	const [, user] = usePbAuth();
	const handleClick = () => {
		setOpen((old) => !old);
	};

	const handleClose = () => {
		setOpen(false);
	};

	if (user === null) return <></>;

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
			<EditUserInfoDialog
				isOpen={open}
				handleClose={handleClose}
				user={user}
			/>
		</>
	);
};

export default EditUserInfo;
