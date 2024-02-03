// Copyright (c) 2024 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import PageMessage from '@/components/PageMessage/PageMessage';
import { FunctionComponent } from 'react';

interface PageProps {}

const Page: FunctionComponent<PageProps> = () => {
	return <PageMessage message="Você está editando um capítulo..." />;
};

export default Page;
