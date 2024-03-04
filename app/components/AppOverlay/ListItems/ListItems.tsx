// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent, Suspense } from 'react';
import Divider from '@mui/material/Divider/Divider';
import List from '@mui/material/List/List';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import React from 'react';
import LinkItem from '@/components/LinkItem/LinkItem';
import dynamic from 'next/dynamic';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import HomeIcon from '@mui/icons-material/Home';
const InstallPwaButton = dynamic(() => import('./InstallPwaButton'), {
	ssr: true,
});
interface ListItemsProps {}

const ListItems: FunctionComponent<ListItemsProps> = () => {
	return (
		<React.Fragment>
			<List>
				<LinkItem
					title="Início"
					tooltip="Página inicial"
					icon={<HomeIcon />}
					href="/"
				/>
				<Divider />

				<LinkItem
					title="Buscar conteúdos"
					tooltip="Buscar todos os artigos e capítulos"
					icon={<TravelExploreIcon />}
					href="/browse/articles"
				/>

				<LinkItem
					title="Criar novo"
					tooltip={
						'Criar novo artigo ou capítulo \n (Você precisa estar logado)'
					}
					icon={<NoteAddIcon />}
					href="/new"
				/>
				<Divider />
				<Suspense fallback={<>...</>}>
					<InstallPwaButton />
				</Suspense>
			</List>
		</React.Fragment>
	);
};

export default ListItems;
