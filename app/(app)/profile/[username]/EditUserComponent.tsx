// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
'use client';

import usePbAuth from '@/hooks/usePbAuth';
import Box from '@mui/material/Box/Box';
import Paper from '@mui/material/Paper/Paper';
import { FunctionComponent } from 'react';

interface EditUserComponentProps {
	username: string;
}

const EditUserComponent: FunctionComponent<EditUserComponentProps> = ({
	username,
}) => {
	const [token, user] = usePbAuth();

	return (
		<Paper sx={{ p: 2 }}>
			{username === user?.username ? (
				<button
					onClick={() => {
						console.log(token);
					}}
				>
					Imprimir meu token
				</button>
			) : (
				<>Você não tem permissão</>
			)}
		</Paper>
	);
};

export default EditUserComponent;
