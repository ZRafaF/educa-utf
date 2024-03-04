// Copyright (c) 2024 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

import { FunctionComponent } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { UsersRecord, UsersResponse } from '@/types/pocketbase-types';
import { updateUser } from '@/lib/apiHelpers/usersAPI';
import { toast } from 'react-toastify';
import ConfirmUserDelete from './ConfirmUserDelete';
import { useRouter } from 'next/navigation';

interface EditUserInfoDialogProps {
	isOpen: boolean;
	handleClose: () => void;
	user: UsersResponse;
}

const EditUserInfoDialog: FunctionComponent<EditUserInfoDialogProps> = ({
	isOpen,
	handleClose,
	user,
}) => {
	const router = useRouter();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data: FormData = new FormData(event.currentTarget);
		const submitName = data.get('user-name')?.toString();
		const submitDescription = data.get('user-description')?.toString();

		if (submitName === undefined) {
			toast.error('Nome não pode estar vazio.');
			return;
		}

		const usersRecord: UsersRecord = {
			name: submitName,
			description: submitDescription,
		};

		updateUser(user.id, usersRecord)
			.then(() => {
				toast.success('Perfil atualizado com sucesso.');
				router.refresh();
				handleClose();
			})
			.catch((e) => {
				toast.error('Erro ao atualizar perfil.');
				console.error(e);
			})
			.finally(() => {
				handleClose();
			});
	};
	return (
		<Dialog
			open={isOpen}
			onClose={handleClose}
			fullWidth
			PaperProps={{
				component: 'form',
				onSubmit: handleSubmit,
			}}
		>
			<DialogTitle>
				<Box
					display={'flex'}
					width={'100%'}
					justifyContent={'space-between'}
				>
					Editar meu perfil
					<ConfirmUserDelete user={user} />
				</Box>
			</DialogTitle>
			<DialogContent>
				<Stack
					direction="column"
					justifyContent="center"
					alignItems="center"
					spacing={2}
					pt={1}
				>
					<TextField
						id="user-name"
						name="user-name"
						label="Nome de exibição"
						variant="outlined"
						fullWidth
						helperText="Máximo de 64 carácteres"
						inputProps={{
							maxLength: 64,
						}}
						multiline
						required
						defaultValue={user.name}
					/>
					<TextField
						name="user-description"
						label="Descrição"
						helperText="Máximo de 256 carácteres"
						inputProps={{
							maxLength: 256,
						}}
						fullWidth
						multiline
						rows={5}
						autoComplete="user-description"
						defaultValue={user.description}
					/>
				</Stack>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} variant="outlined">
					Cancelar
				</Button>
				<Button type="submit" autoFocus variant="contained">
					Salvar
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default EditUserInfoDialog;
