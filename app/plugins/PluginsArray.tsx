// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

import EquationEditor from './Equation/EquationEditor';
import { PluginType } from './PluginsTypes';
import Equation from './Equation/Equation';
import RadialSelectorEditor from './RadialSelector/RadialSelectorEditor';
import RadialSelector from './RadialSelector/RadialSelector';

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
	{
		key: 'radialSelectorPlugin',
		title: 'Exercício de seleção radial',
		tooltip: 'Novo exercício de Seleção radial',
		editor: RadialSelectorEditor,
		render: RadialSelector,
		hidden: false,
		category: 'Exercícios',
	},
];

export default PluginsArray;
