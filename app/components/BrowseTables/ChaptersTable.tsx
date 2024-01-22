// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2/Grid2'; // Grid version 2
import { getListOfChaptersStats } from '@/lib/apiHelpers/chaptersAPI';
import ChapterCard from '../ChapterCard/ChapterCard';
import PaginationComponent from './PaginationComponent';
import Box from '@mui/material/Box';
import {
	MIN_FOOTER_HEIGHT,
	MIN_PAGINATION_HEIGHT,
	MIN_TOOLBAR_HEIGHT,
} from '@/lib/helper';
import PageMessage from '../PageMessage/PageMessage';

interface ChaptersTableProps {
	searchParams?: { [key: string]: string | string[] | undefined };
}

const ChaptersTable: FunctionComponent<ChaptersTableProps> = async ({
	searchParams,
}) => {
	const sort = searchParams?.sort ?? '-created';
	const page = Number(searchParams?.page ?? 1);
	const items = Number(searchParams?.items ?? 50);
	const filter = searchParams?.filter ?? '';

	const chaptersList = await getListOfChaptersStats(page, items, {
		sort: sort,
		filter: filter,
	});

	if (chaptersList.totalItems === 0)
		return (
			<PageMessage message="Ops. Parece que não ha correspondências a sua pesquisa. Tente alterar seus filtros!" />
		);

	return (
		<>
			<Box
				minHeight={`calc(100vh - ${MIN_FOOTER_HEIGHT} - ${MIN_TOOLBAR_HEIGHT} - ${MIN_PAGINATION_HEIGHT})`}
			>
				<Box display={'flex'} flexDirection={'row-reverse'} mb={2}>
					<Typography variant="caption" gutterBottom>
						Total de itens encontrados: {chaptersList.totalItems}
					</Typography>
				</Box>
				<Grid
					container
					spacing={1}
					sx={{
						justifyContent: {
							xs: 'center',
							sm: 'left',
							md: 'space-between',
							lg: 'space-between',
						},
					}}
				>
					{chaptersList.items.map((chapter, idx) => (
						<Grid
							key={`chapter_${idx}`}
							xs={6}
							sm={4}
							md={3}
							lg={2.4}
							xl={2.4}
						>
							<ChapterCard
								myChapter={chapter}
								isExpanded={false}
							/>
						</Grid>
					))}
				</Grid>
			</Box>
			<PaginationComponent totalPages={chaptersList.totalPages} />
		</>
	);
};

export default ChaptersTable;
