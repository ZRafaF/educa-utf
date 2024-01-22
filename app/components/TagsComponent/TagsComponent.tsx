// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

import { KeyWordsRecord, TagsResponse } from '@/types/pocketbase-types';
import { FunctionComponent } from 'react';
import dynamic from 'next/dynamic';

const NoSSRTags = dynamic(() => import('./NoSSRTags'), {
	ssr: false,
});
interface TagsComponentProps {
	keyWords: KeyWordsRecord[] | undefined;
	tag: TagsResponse | undefined;
	expanded?: boolean;
}

const TagsComponent: FunctionComponent<TagsComponentProps> = ({
	keyWords,
	tag,
	expanded,
}) => {
	return <NoSSRTags keyWords={keyWords} tag={tag} expanded={expanded} />;
};

export default TagsComponent;
