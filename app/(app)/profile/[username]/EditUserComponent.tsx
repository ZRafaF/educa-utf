// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
'use client';

import usePbAuth from '@/hooks/usePbAuth';
import { updateUserAvatar } from '@/lib/apiHelpers/usersAPI';
import Paper from '@mui/material/Paper/Paper';
import React from 'react';
import { FunctionComponent, useState } from 'react';

interface EditUserComponentProps {
	username: string;
}

const EditUserComponent: FunctionComponent<EditUserComponentProps> = ({
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
		<Paper sx={{ p: 2 }}>
			{username === user?.username ? (
				<React.Fragment>
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
				</React.Fragment>
			) : (
				<>Você não tem permissão</>
			)}
		</Paper>
	);
};

export default EditUserComponent;
