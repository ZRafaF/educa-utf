// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

import EquationEditor from './Equation/EquationEditor';
import Equation from './Equation/Equation';
import { PluginType } from './PluginsTypes';

// export const PluginsOverride: PluginsOverrideType = {
// 	Equation: Equation,
// };

const PluginsArray: PluginType[] = [
	{
		key: 'equationPlugin',
		title: 'Criador de equações',
		tooltip: 'Equação matemática',
		editor: EquationEditor,
		render: Equation,
		hidden: true,
		category: '',
	},
];

export default PluginsArray;
