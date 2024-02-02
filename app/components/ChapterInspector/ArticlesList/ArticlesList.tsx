// Copyright (c) 2024 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { ArticlesResponse, ChaptersResponse } from '@/types/pocketbase-types';
import { Dispatch, FunctionComponent, SetStateAction } from 'react';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import ArticlesListItem from './ArticlesListItem';
import Divider from '@mui/material/Divider';
import { ChaptersExpand } from '@/types/expanded-types';
import Box from '@mui/material/Box';

interface ArticlesListProps {
	chapter: ChaptersResponse<ChaptersExpand>;
	paths: string[];
	editMode: boolean;
	editedChapter: ChaptersResponse<ChaptersExpand>;
	setEditedChapter: Dispatch<
		SetStateAction<ChaptersResponse<ChaptersExpand> | undefined>
	>;
}

const ArticlesList: FunctionComponent<ArticlesListProps> = ({
	chapter,
	paths,
	editMode,
	editedChapter,
	setEditedChapter,
}) => {
	const articles = editedChapter.expand?.articles ?? [];
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
