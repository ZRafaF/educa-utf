// Copyright (c) 2024 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import ArticleSelector from '@/components/ArticleSelector/ArticleSelector';
import { ArticlesResponse } from '@/types/pocketbase-types';
import Button from '@mui/material/Button';
import { FunctionComponent } from 'react';

interface ArticleAdderProps {}

const ArticleAdder: FunctionComponent<ArticleAdderProps> = () => {
	const selectorCallBack = (article: ArticlesResponse) => {};

	return (
		<>
			<Button></Button>
			<ArticleSelector callback={selectorCallBack} />
		</>
	);
};

export default ArticleAdder;
