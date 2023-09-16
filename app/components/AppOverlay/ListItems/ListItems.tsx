// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent } from 'react';
import Divider from '@mui/material/Divider/Divider';
import List from '@mui/material/List/List';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import QueueIcon from '@mui/icons-material/Queue';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import React from 'react';
import LinkItem from '@/components/AppOverlay/LinkItem/LinkItem';

interface ListItemsProps {}

const ListItems: FunctionComponent<ListItemsProps> = () => {
	return (
		<React.Fragment>
			<List>
				<LinkItem
					title="Em alta"
					tooltip="Posts em alta"
					icon={<WhatshotIcon />}
					href="/"
				/>
				<LinkItem
					title="Posts"
					tooltip="Todos os posts"
					icon={<AutoStoriesIcon />}
					href="/browse/posts"
				/>
				<LinkItem
					title="Capítulos"
					tooltip="Todos as capítulos"
					icon={<LibraryBooksIcon />}
					href="/browse/chapters"
				/>
			</List>
			<Divider />
			<List>
				<LinkItem
					title="Novo post"
					tooltip="Criar novo post"
					icon={<NoteAddIcon />}
					href="/new-post"
				/>
				<LinkItem
					title="Nova capítulo"
					tooltip="Criar novo capítulo"
					icon={<QueueIcon />}
					href="/new-chapter"
				/>
			</List>
		</React.Fragment>
	);
};

export default ListItems;
