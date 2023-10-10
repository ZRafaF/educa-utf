// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

import {
	getUserAvatarUrl,
	getUserAvatarUrlByUserId,
	updateUserAvatar,
} from '@/lib/apiHelpers/usersAPI';
import { UsersStatsResponse } from '@/types/pocketbase-types';
import { FunctionComponent, useEffect, useMemo, useState } from 'react';
import AvatarComponent from '../AvatarComponent/AvatarComponent';
import Box from '@mui/material/Box';
import usePbAuth from '@/hooks/usePbAuth';
import { IconButton, Tooltip } from '@mui/material';
import useUploadFile from '@/hooks/useUploadFile';
import { toast } from 'react-toastify';
import DeleteIcon from '@mui/icons-material/Delete';

interface EditablePfpProps {
	userStats: UsersStatsResponse;
}

const EditablePfp: FunctionComponent<EditablePfpProps> = ({ userStats }) => {
	const [, user] = usePbAuth();
	const [authorAvatarUrl, setAuthorAvatarUrl] = useState<string>(
		getUserAvatarUrl(userStats)
	);
	const disabled = useMemo(() => {
		if (user) {
			if (user.id === userStats.id) return false;
		}
		return true;
	}, [user, userStats]);

	useEffect(() => {
		getUserAvatarUrlByUserId(userStats.id).then((url) => {
			setAuthorAvatarUrl(url);
		});
	}, [user, userStats]);

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

	const removePfp = () => {
		if (user) {
			updateUserAvatar(user.id, null)
				.then(() => toast.success('Imagem removida com sucesso'))
				.catch((e) => {
					console.error(e);
					toast.error('Algo deu errado, erro: ' + e);
				});
		}
	};

	return (
		<Box
			sx={{
				position: 'relative',
			}}
		>
			<Tooltip title="Editar imagem de perfil" arrow>
				<Box>
					<IconButton
						onClick={() => {
							updatePfp();
						}}
						disabled={disabled}
					>
						<AvatarComponent
							name={userStats.name}
							src={authorAvatarUrl}
							size="x-large"
						/>
					</IconButton>
				</Box>
			</Tooltip>
			{!disabled && (
				<Tooltip title="Remover imagem de perfil" arrow>
					<IconButton
						sx={{
							position: 'absolute',
							right: -5,
							bottom: -5,
						}}
						size="small"
						onClick={() => {
							removePfp();
						}}
					>
						<DeleteIcon fontSize="small" color="disabled" />
					</IconButton>
				</Tooltip>
			)}
			<InputComponent />
		</Box>
	);
};

export default EditablePfp;
