// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent } from 'react';
import Divider from '@mui/material/Divider/Divider';
import List from '@mui/material/List/List';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import React from 'react';
import LinkItem from '@/components/LinkItem/LinkItem';
import dynamic from 'next/dynamic';
const CreateNewButton = dynamic(() => import('./CreateNewButton'), {
	ssr: false,
});
const InstallPwaButton = dynamic(() => import('./InstallPwaButton'), {
	ssr: false,
});
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
					title="Buscar artigos"
					tooltip="Buscar todos os artigos"
					icon={<AutoStoriesIcon />}
					href="/browse/articles"
				/>
				<LinkItem
					title="Buscar capítulos"
					tooltip="Buscar todos os capítulos"
					icon={<LibraryBooksIcon />}
					href="/browse/chapters"
				/>
				<Divider />
				<CreateNewButton />

				<Divider />
				<InstallPwaButton />
			</List>
		</React.Fragment>
	);
};

export default ListItems;
