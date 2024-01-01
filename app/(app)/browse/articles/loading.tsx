// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import PageMessage from '@/components/PageMessage/PageMessage';

export default function Loading() {
	return <PageMessage message="Buscando artigos, aguarde..." loading />;
}
