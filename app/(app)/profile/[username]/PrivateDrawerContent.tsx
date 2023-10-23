// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Toolbar from '@mui/material/Toolbar';
import React from 'react';
import { FunctionComponent } from 'react';
import MailIcon from '@mui/icons-material/Mail';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import CollapsibleList from '@/components/CollapsibleList/CollapsibleList';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import QueueIcon from '@mui/icons-material/Queue';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Box from '@mui/material/Box';
import LinkItem from '@/components/LinkItem/LinkItem';
import dynamic from 'next/dynamic';
import EditUserInfo from '@/components/EditUserInfo/EditUserInfo';
import EditUserInfoSender from '@/components/EditUserInfo/EditUserInfoSender';

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
		<>
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
				<CollapsibleList
					icon={<ManageAccountsIcon />}
					title="Minhas informações"
				>
					<EditUserInfo />
				</CollapsibleList>
				<Divider />
				<LinkItem
					title="Novo artigo"
					icon={<NoteAddIcon />}
					href="/new-article"
				/>
				<LinkItem
					title="Novo capítulo"
					icon={<QueueIcon />}
					href="/new-chapter"
				/>
				<Divider />
				<CollapsibleList icon={<FavoriteIcon />} title="Meus favoritos">
					<ListItemButton>
						<ListItemIcon>
							<MailIcon />
						</ListItemIcon>
						<ListItemText primary="Starred" />
					</ListItemButton>
				</CollapsibleList>
				<CollapsibleList
					icon={<AutoStoriesIcon />}
					title="Meus artigos"
				>
					<Box pt={1} px={1}>
						<DataTable fetchType="articles" userId={userId} />
					</Box>
				</CollapsibleList>
				<CollapsibleList
					icon={<LibraryBooksIcon />}
					title="Meus capítulos"
				>
					<Box pt={1} px={1}>
						<DataTable fetchType="chapters" userId={userId} />
					</Box>
				</CollapsibleList>
			</List>
		</>
	);
};

export default PrivateDrawerContent;
