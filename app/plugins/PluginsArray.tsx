// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

import dynamic from 'next/dynamic';
import EquationEditor from './Equation/EquationEditor';
import { PluginType } from './PluginsTypes';
import Equation from './Equation/Equation';

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
