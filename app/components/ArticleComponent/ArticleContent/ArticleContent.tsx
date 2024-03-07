// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent, Suspense } from 'react';
import './github-markdown.css';
import Box from '@mui/material/Box/Box';
import MdRenderer from './MdRenderer/MdRenderer';
import { ArticlesResponse } from '@/types/pocketbase-types';
import PageMessage from '@/components/PageMessage/PageMessage';

interface ArticleContentProps {
	articleDocument: string;
	article: ArticlesResponse | undefined;
}

const ArticleContent: FunctionComponent<ArticleContentProps> = ({
	articleDocument,
	article,
}) => {
	return (
		<Box className="markdown-body">
			<Suspense
				fallback={
					<PageMessage loading message="Carregando artigo..." />
				}
			>
				<MdRenderer
					article={article}
					articleDocument={articleDocument}
				/>
			</Suspense>
		</Box>
	);
};

export default ArticleContent;
