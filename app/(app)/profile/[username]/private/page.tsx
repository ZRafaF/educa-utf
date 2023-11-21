// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent } from 'react';

interface PageProps {
	params: {
		username: string;
	};
}

const Page: FunctionComponent<PageProps> = async ({ params }) => {
	return <div>Privado {params.username}</div>;
};

export default Page;
