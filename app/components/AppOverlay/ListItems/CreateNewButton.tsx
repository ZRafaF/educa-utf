// Copyright (c) 2024 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

import { FunctionComponent } from 'react';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import LinkItem from '@/components/LinkItem/LinkItem';
import usePbAuth from '@/hooks/usePbAuth';

interface CreateNewButtonProps {}

const CreateNewButton: FunctionComponent<CreateNewButtonProps> = () => {
	const [, user] = usePbAuth();

	return (
		<LinkItem
			title="Criar novo"
			tooltip={
				'Criar novo artigo ou capítulo \n (Você precisa estar logado)'
			}
			icon={<NoteAddIcon />}
			href="/new"
			disabled={user === null}
		/>
	);
};

export default CreateNewButton;
