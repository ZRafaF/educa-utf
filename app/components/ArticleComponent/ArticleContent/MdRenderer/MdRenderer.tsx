// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

import { FunctionComponent } from 'react';
import Markdown from 'markdown-to-jsx';
import useOverridePlugins from '@/plugins/useOverridePlugins';
import ArticleIdContext from '@/contexts/ArticleIdContext';
import { ArticlesResponse } from '@/types/pocketbase-types';

interface MdRendererProps {
	articleDocument: string;
	article: ArticlesResponse | undefined;
}

const MdRenderer: FunctionComponent<MdRendererProps> = ({
	articleDocument,
	article,
}) => {
	const [pluginsOverrides] = useOverridePlugins();

	return (
		<ArticleIdContext.Provider value={article}>
			<Markdown
				options={{
					overrides: pluginsOverrides,
				}}
			>
				{articleDocument}
			</Markdown>
		</ArticleIdContext.Provider>
	);
};

export default MdRenderer;
