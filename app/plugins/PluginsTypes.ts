// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent } from 'react';

export interface PluginEditorProps {
	returnFunction: (componentRawString: string | undefined) => void;
}

export type PluginType = {
	/** Unique key for the plugin */
	key: string;

	/** Title of the modal
	 *
	 * @example 'Editor de equações'
	 */
	title: string;

	/** Tooltip for the button when hovered
	 *
	 * @example 'Nova equação matemática'
	 */
	tooltip: string;

	/** Editor component for the plugin
	 *
	 * This component gets rendered inside a modal
	 */
	editor: FunctionComponent<PluginEditorProps>;

	/** Render component for the plugin
	 *
	 * This component gets rendered inside the markdown
	 */
	render: FunctionComponent<any>;

	/** If the plugin should be hidden from the plugins menu */
	hidden?: boolean;

	/** Category of the plugin on the plugins menu
	 *
	 * @example 'Math'
	 */
	category: string;

	/** Shortcut for the plugin
	 *
	 * @example 'Ctrl+Shift+M'
	 */
	shortcut?: string;
};
