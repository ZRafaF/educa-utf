// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import EquationEditor from './Equation/EquationEditor';
import Equation from './Equation/Equation';
import { PluginType } from './PluginsTypes';

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
