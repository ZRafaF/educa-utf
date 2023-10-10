// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

import { getUserAvatarUrl, updateUserAvatar } from '@/lib/apiHelpers/usersAPI';
import { UsersStatsResponse } from '@/types/pocketbase-types';
import { FunctionComponent, useMemo, useState } from 'react';
import AvatarComponent from '../AvatarComponent/AvatarComponent';
import Box from '@mui/material/Box';
import usePbAuth from '@/hooks/usePbAuth';
import { IconButton, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import useUploadFile from '@/hooks/useUploadFile';
import { toast } from 'react-toastify';

interface EditablePfpProps {
	userStats: UsersStatsResponse;
}

const EditablePfp: FunctionComponent<EditablePfpProps> = ({ userStats }) => {
	const [, user] = usePbAuth();
	const authorAvatarUrl = useMemo(
		() => getUserAvatarUrl(user ? user : userStats),
		[userStats, user]
	);
	const disabled = useMemo(() => {
		if (user) {
			if (user.id === userStats.id) return false;
		}
		return true;
	}, [user]);

	const [uploadImage, InputComponent] = useUploadFile();

	const updatePfp = async () => {
		const id = toast.loading('Atualizando imagem de perfil...');
		try {
			const newPfp = await uploadImage();
			if (newPfp && user) {
				await updateUserAvatar(user.id, newPfp);
			}
			toast.update(id, {
				render: 'Atualizado com sucesso!',
				type: 'success',
				isLoading: false,
				autoClose: 5000,
				pauseOnFocusLoss: true,
				draggable: true,
				pauseOnHover: true,
				closeOnClick: true,
			});
		} catch (error) {
			console.error(error);
			toast.update(id, {
				render: 'Algo deu errado!',
				type: 'error',
				isLoading: false,
				autoClose: 5000,
				pauseOnFocusLoss: true,
				draggable: true,
				pauseOnHover: true,
				closeOnClick: true,
			});
		}
	};

	return (
		<Box
			sx={{
				position: 'relative',
			}}
		>
			<IconButton
				onClick={() => {
					updatePfp();
				}}
				disabled={disabled}
			>
				<AvatarComponent
					name={userStats.name}
					src={authorAvatarUrl}
					size="huge"
				/>
			</IconButton>
			{!disabled && (
				<IconButton
					sx={{
						position: 'absolute',
						right: -5,
						bottom: -5,
					}}
					size="small"
					onClick={() => {
						updatePfp();
					}}
				>
					<EditIcon />
				</IconButton>
			)}
			<InputComponent />
		</Box>
	);
};

export default EditablePfp;
