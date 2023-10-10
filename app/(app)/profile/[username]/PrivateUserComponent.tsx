// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
'use client';

import usePbAuth from '@/hooks/usePbAuth';
import Box from '@mui/material/Box';
import React from 'react';
import { FunctionComponent } from 'react';

interface PrivateUserComponentProps {
	username: string;
}

const drawerWidth = 400;

const PrivateUserComponent: FunctionComponent<PrivateUserComponentProps> = ({
	username,
}) => {
	const [, user] = usePbAuth();

	if (username !== user?.username) return <></>;

	return (
		<Box display={'flex'} width={drawerWidth}>
			Meu perfil
		</Box>
	);
};

export default PrivateUserComponent;
