// Copyright (c) 2024 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent } from 'react';
import dynamic from 'next/dynamic';
const DynamicButton = dynamic(() => import('./DynamicButton'), {
	ssr: false,
});

interface LikeButtonProps {
	numberOfLikes?: number;
	item?: {
		id: string;
		type: 'articles' | 'chapters';
	};
}

const LikeButton: FunctionComponent<LikeButtonProps> = ({
	numberOfLikes,
	item,
}) => {
	return <DynamicButton numberOfLikes={numberOfLikes} item={item} />;
};

export default LikeButton;
