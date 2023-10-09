// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
'use client';

import usePbAuth from '@/hooks/usePbAuth';
import { updateUserAvatar } from '@/lib/apiHelpers/usersAPI';
import Box from '@mui/material/Box';
import React from 'react';
import { FunctionComponent, useState } from 'react';

interface PrivateUserComponentProps {
	username: string;
}

const drawerWidth = 400;

const PrivateUserComponent: FunctionComponent<PrivateUserComponentProps> = ({
	username,
}) => {
	const [token, user] = usePbAuth();

	const [selectedFile, setSelectedFile] = useState<File | null>(null);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files && event.target.files[0];
		if (file) {
			setSelectedFile(file);
		}
	};

	const uploadAvatar = () => {
		if (selectedFile && user) {
			console.log('Selected File:', selectedFile);

			updateUserAvatar(user.id, selectedFile);

			// Clear the selected file
			setSelectedFile(null);
		} else {
			alert('Nenhum arquivo selecionado');
		}
	};

	return (
		<>
			{username === user?.username && (
				<Box display={'flex'} width={drawerWidth}>
					<button
						onClick={() => {
							console.log('token: ' + token);
							console.log('user:');
							console.log(user);
						}}
					>
						Imprimir meu token e usuário
					</button>
					<input
						type="file"
						accept=".jpg, .jpeg, .png, .pdf" // Specify allowed file types
						onChange={handleFileChange}
					/>
					<button onClick={uploadAvatar}>
						Atualizar imagem de perfil
					</button>
				</Box>
			)}
		</>
	);
};

export default PrivateUserComponent;
