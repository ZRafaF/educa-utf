// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

import { FunctionComponent, useRef } from 'react';
import { increaseViews } from '@/lib/apiHelpers/miscAPI';
import { useEffect } from 'react';

interface ViewsBumperProps {
	collectionName: string;
	recordId: string;
}

const ViewsBumper: FunctionComponent<ViewsBumperProps> = ({
	collectionName,
	recordId,
}) => {
	const initialized = useRef(false);

	useEffect(() => {
		if (!initialized.current) {
			initialized.current = true;

			increaseViews(collectionName, recordId);
		}
	}, [collectionName, recordId]);

	return <></>;
};

export default ViewsBumper;
