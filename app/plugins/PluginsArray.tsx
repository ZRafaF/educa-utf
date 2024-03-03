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
import UpperMakerEditor from './UpperMaker/UpperMakerEditor';
import UpperMaker from './UpperMaker/UpperMaker';

const PluginsArray: PluginType[] = [
	{
		key: 'equationPlugin',
		title: 'Criador de equações',
		tooltip: 'Equação matemática',
		editor: EquationEditor,
		render: Equation,
		placement: 'toolbar',
		category: '',
		className: 'fa fa-superscript',
	},
	{
		key: 'radialSelectorPlugin',
		title: 'Exercício de seleção radial',
		tooltip: 'Novo exercício de Seleção radial',
		editor: RadialSelectorEditor,
		render: RadialSelector,
		placement: 'menu',
		category: 'Exercícios',
	},
	{
		key: 'upperMakerPlugin',
		title: 'Utilizar maiúsculas',
		tooltip: 'Converte o texto para maiúsculas',
		editor: UpperMakerEditor,
		render: UpperMaker,
		placement: 'menu',
		hidden: true,
		category: 'Texto',
	},
];

export default PluginsArray;
