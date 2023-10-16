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
// import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CollapsibleList from '@/components/CollapsibleList/CollapsibleList';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import QueueIcon from '@mui/icons-material/Queue';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import DataTable from '@/components/DataTable/DataTable';
import Box from '@mui/material/Box';

interface PrivateDrawerContentProps {}

const PrivateDrawerContent: FunctionComponent<
	PrivateDrawerContentProps
> = () => {
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
					<ListItemButton>
						<ListItemIcon>
							<MailIcon />
						</ListItemIcon>
						<ListItemText primary="Starred" />
					</ListItemButton>
				</CollapsibleList>
				<Divider />
				<ListItem disablePadding>
					<ListItemButton>
						<ListItemIcon>
							<NoteAddIcon />
						</ListItemIcon>
						<ListItemText primary={'Criar novo artigo'} />
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton>
						<ListItemIcon>
							<QueueIcon />
						</ListItemIcon>
						<ListItemText primary={'Criar novo capítulo'} />
					</ListItemButton>
				</ListItem>
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
						<DataTable fetchType="articles" />
					</Box>
				</CollapsibleList>
				<CollapsibleList
					icon={<LibraryBooksIcon />}
					title="Meus capítulos"
				>
					<Box pt={1} px={1}>
						<DataTable fetchType="chapters" />
					</Box>
				</CollapsibleList>
			</List>
		</>
	);
};

export default PrivateDrawerContent;
