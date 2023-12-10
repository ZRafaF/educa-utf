// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

import { FunctionComponent, useMemo } from 'react';
import Markdown from 'markdown-to-jsx';
import PreBlock from './PreBlock';
import PluginsArray from '@/plugins/PluginsArray';

interface MdRendererProps {
	article: string;
}

const MdRenderer: FunctionComponent<MdRendererProps> = ({ article }) => {
	const renderers: { [key: string]: FunctionComponent<any> } = useMemo(() => {
		const rendererMap: { [key: string]: FunctionComponent<any> } = {};

		PluginsArray.forEach((plugin) => {
			rendererMap[plugin.render.name] = plugin.render;
		});

		return rendererMap;
	}, []);

	return (
		<Markdown
			options={{
				overrides: {
					...renderers,
					pre: PreBlock,
				},
			}}
		>
			{article}
		</Markdown>
	);
};

export default MdRenderer;
