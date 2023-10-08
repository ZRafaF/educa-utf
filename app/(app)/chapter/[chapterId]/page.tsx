// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import PageMessage from '@/components/PageMessage/PageMessage';
import { FunctionComponent } from 'react';

interface PageProps {}

const Page: FunctionComponent<PageProps> = () => {
	return <PageMessage message="Nenhum post selecionado." />;
};

export default Page;
