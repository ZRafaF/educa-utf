// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent } from "react";

interface PageProps {
	params: {
		postId: string;
	};
}

const Page: FunctionComponent<PageProps> = ({ params }) => {
	return <div>{params.postId}</div>;
};

export default Page;
