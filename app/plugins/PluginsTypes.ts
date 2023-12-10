// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent } from 'react';

export interface PluginEditorProps {
	returnFunction: (componentRawString: string | undefined) => void;
}

export type PluginType = {
	key: string;
	title: string;
	tooltip: string;
	editor: FunctionComponent<PluginEditorProps>;
	render: FunctionComponent<any>;
	hidden?: boolean;
	category: string;
	shortcut?: string;
};
