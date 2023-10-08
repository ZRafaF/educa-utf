// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import type { Metadata } from 'next/types';

import PageMessage from '@/components/PageMessage/PageMessage';

export const metadata: Metadata = {
	title: 'Carregando Aleatório - EducaUTF',
	description: 'Redireciona para um artigo ou capitulo aleatório',
	keywords: ['EducaUTF', 'Educa UTF', 'aleatório', 'random', 'loading'],
};

export default function Loading() {
	return <PageMessage message="Redirecionando, aguarde..." loading />;
}
