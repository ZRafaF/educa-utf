// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

import { FormEvent, FunctionComponent, ReactNode } from 'react';

interface EditUserInfoSenderProps {
	children: ReactNode;
}

const EditUserInfoSender: FunctionComponent<EditUserInfoSenderProps> = ({
	children,
}) => {
	const submitUpdate = (event: FormEvent<HTMLFormElement>) => {
		console.log(event);
	};

	return <form onSubmit={submitUpdate}>{children}</form>;
};

export default EditUserInfoSender;
