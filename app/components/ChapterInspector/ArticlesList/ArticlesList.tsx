// Copyright (c) 2024 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { ArticlesResponse, ChaptersResponse } from '@/types/pocketbase-types';
import { Dispatch, FunctionComponent, SetStateAction, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import ArticlesListItem from './ArticlesListItem';
import Divider from '@mui/material/Divider';
import { ChaptersExpand } from '@/types/expanded-types';
import Box from '@mui/material/Box';
import { usePathname } from 'next/navigation';

interface ArticlesListProps {
	chapter: ChaptersResponse<ChaptersExpand>;
	editMode: boolean;
	editedChapter: ChaptersResponse<ChaptersExpand>;
	setEditedChapter: Dispatch<
		SetStateAction<ChaptersResponse<ChaptersExpand> | undefined>
	>;
}

const ArticlesList: FunctionComponent<ArticlesListProps> = ({
	chapter,
	editMode,
	editedChapter,
	setEditedChapter,
}) => {
	const articles = editedChapter.expand?.articles ?? [];
	const pathname = usePathname();
	const paths = pathname.split('/');

	if (articles === undefined) {
		return <Box>Vazio</Box>;
	}

	const handleOnDragEnd = (result: any) => {
		if (!result.destination || !editedChapter.expand) return;
		const itemsArray = Array.from(articles);
		const [reorderedItem] = itemsArray.splice(result.source.index, 1);
		itemsArray.splice(result.destination.index, 0, reorderedItem);

		setEditedChapter({
			...editedChapter,
			expand: {
				...editedChapter.expand,
				articles: itemsArray,
			},
		});
	};

	const removeArticle = (article: ArticlesResponse) => {
		if (!editedChapter.expand) return;
		const itemsArray = editedChapter.expand?.articles ?? [];
		const index = itemsArray.findIndex((a) => a.id === article.id);

		itemsArray.splice(index, 1);

		const tempCopy: ChaptersResponse<ChaptersExpand> = {
			...editedChapter,
		};

		if (tempCopy.expand) tempCopy.expand.articles = itemsArray;
		setEditedChapter(tempCopy);
	};

	return (
		<DragDropContext onDragEnd={handleOnDragEnd}>
			<Droppable droppableId="droppable">
				{(provided) => (
					<div ref={provided.innerRef} {...provided.droppableProps}>
						{articles.map((article: ArticlesResponse, index) => (
							<Draggable
								draggableId={article.id}
								index={index}
								key={article.id}
								isDragDisabled={!editMode}
							>
								{(provided, snapshot) => {
									return (
										<div
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
										>
											<Box
												border={
													snapshot.isDragging ? 1 : 0
												}
											>
												<ArticlesListItem
													article={article}
													chapter={chapter}
													active={
														paths[
															paths.length - 1
														] === article.id
													}
													editMode={editMode}
													removeArticle={
														removeArticle
													}
												/>
											</Box>
											<Divider />
										</div>
									);
								}}
							</Draggable>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
};

export default ArticlesList;
