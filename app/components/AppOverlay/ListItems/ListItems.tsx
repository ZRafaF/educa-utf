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
import InstallPwaButton from './InstallPwaButton';

interface ListItemsProps {}

const ListItems: FunctionComponent<ListItemsProps> = () => {
	return (
		<React.Fragment>
			<List>
				<LinkItem
					title="Em alta"
					tooltip="Artigos em alta"
					icon={<WhatshotIcon />}
					href="/"
				/>
				<LinkItem
					title="Artigos"
					tooltip="Todos os artigos"
					icon={<AutoStoriesIcon />}
					href="/browse/articles"
				/>
				<LinkItem
					title="Capítulos"
					tooltip="Todos os capítulos"
					icon={<LibraryBooksIcon />}
					href="/browse/chapters"
				/>
				<Divider />
				<LinkItem
					title="Novo artigo"
					tooltip="Criar novo artigo"
					icon={<NoteAddIcon />}
					href="/new-article"
				/>
				<LinkItem
					title="Novo capítulo"
					tooltip="Criar novo capítulo"
					icon={<QueueIcon />}
					href="/new-chapter"
				/>
				<Divider />
				<InstallPwaButton />
			</List>
		</React.Fragment>
	);
};

export default ListItems;
