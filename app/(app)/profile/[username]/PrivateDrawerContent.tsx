// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import React from 'react';
import { FunctionComponent } from 'react';
import Typography from '@mui/material/Typography';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import Box from '@mui/material/Box';
import LinkItem from '@/components/LinkItem/LinkItem';
import dynamic from 'next/dynamic';
import EditUserInfo from '@/components/EditUserInfo/EditUserInfo';

const DataTable = dynamic(() => import('@/components/DataTable/DataTable'), {
	ssr: false,
});

interface PrivateDrawerContentProps {
	userId: string;
}

const PrivateDrawerContent: FunctionComponent<PrivateDrawerContentProps> = ({
	userId,
}) => {
	return (
		<Box
			sx={{
				pt: { xs: 8, sm: 8, md: 4 },
			}}
			position={'relative'}
		>
			<Toolbar
				sx={{
					justifyContent: 'center',
					//boxShadow: 'inset 0 0 4px #000',
				}}
			>
				<Typography
					variant="h3"
					fontSize={'xx-large'}
					component="h2"
					fontWeight={600}
				>
					Meu perfil
				</Typography>
			</Toolbar>
			<List>
				<Divider />

				<EditUserInfo />
				<Divider />
				<LinkItem
					title="Criar artigo ou capítulo"
					icon={<NoteAddIcon />}
					href="/new"
					tooltip="Crie um novo artigo ou capítulo"
				/>
				<Divider />

				{/* <CollapsibleList icon={<FavoriteIcon />} title="Meus favoritos">
					<ListItemButton>
						<ListItemIcon>
							<MailIcon />
						</ListItemIcon>
						<ListItemText primary="Starred" />
					</ListItemButton>
				</CollapsibleList> */}
			</List>
		</Box>
	);
};

export default PrivateDrawerContent;
