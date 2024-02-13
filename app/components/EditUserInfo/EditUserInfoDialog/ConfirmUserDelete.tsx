// Copyright (c) 2024 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

import { FunctionComponent, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import { UsersResponse } from '@/types/pocketbase-types';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { deleteUser } from '@/lib/apiHelpers/usersAPI';
import { logOut } from '@/lib/apiHelpers/authAPI';

interface ConfirmUserDeleteProps {
	user: UsersResponse;
}

const ConfirmUserDelete: FunctionComponent<ConfirmUserDeleteProps> = ({
	user,
}) => {
	const [open, setOpen] = useState(false);
	const [inputUsername, setInputUsername] = useState('');
	const router = useRouter();

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<Button color="error" variant="outlined" onClick={handleOpen}>
				Excluir
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				PaperProps={{
					sx: { border: '3px solid', borderColor: 'error.main' },
				}}
			>
				<DialogTitle>
					Tem certeza que deseja{' '}
					<Box
						color={'error.main'}
						component={'span'}
						fontWeight={'bold'}
					>
						EXCLUIR
					</Box>{' '}
					sua conta?
				</DialogTitle>
				<DialogContent>
					<Stack direction="column" spacing={2} pt={1}>
						<Typography>
							Atenção essa ação{' '}
							<Box
								color={'error.main'}
								component={'span'}
								fontWeight={'bold'}
							>
								não pode ser desfeita!
							</Box>{' '}
							Todos os seus dados, artigos, capítulos e
							informações{' '}
							<Box
								color={'error.main'}
								component={'span'}
								fontWeight={'bold'}
							>
								Serão excluídos!
							</Box>
						</Typography>
						<Typography>
							Digite seu usuário para confirmar a exclusão da
							conta.
						</Typography>
						<TextField
							id="user-name"
							name="user-name"
							label="Usuário"
							variant="outlined"
							fullWidth
							helperText={
								<>
									Digite{' '}
									<Box component={'span'} fontWeight={'bold'}>
										&quot;{user.username}&quot;
									</Box>{' '}
									para confirmar.
								</>
							}
							required
							onChange={(e) => {
								setInputUsername(e.target.value);
							}}
							error={inputUsername !== user.username}
							value={inputUsername}
						/>
					</Stack>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={() => {
							setInputUsername('');
							handleClose();
						}}
						variant="outlined"
					>
						Cancelar
					</Button>
					<Button
						type="submit"
						autoFocus
						variant="contained"
						color="error"
						disabled={inputUsername !== user.username}
						onClick={() => {
							deleteUser(user.id)
								.then(() => {
									logOut();
									toast.success(
										'Conta excluída com sucesso!'
									);
									router.push('/');
								})
								.catch((error) => {
									toast.error('Erro ao excluir conta!');
									console.error(error);
								});
						}}
					>
						Confirmar Exclusão
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default ConfirmUserDelete;
