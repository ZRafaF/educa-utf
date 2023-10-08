// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent } from 'react';
import type { Metadata } from 'next/types';
import PageMessage from '@/components/PageMessage/PageMessage';

export const metadata: Metadata = {
	title: 'Aleatório - EducaUTF',
	description: 'Redireciona para um artigo ou capitulo aleatório',
	keywords: ['EducaUTF', 'Educa UTF', 'aleatório', 'random'],
};

interface PageProps {}

const Page: FunctionComponent<PageProps> = async () => {
	return <PageMessage message="Redirecionando, aguarde..." loading />;
};

export default Page;
