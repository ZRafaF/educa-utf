// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
'use client';

import { ChangeEvent, useRef } from 'react';

const useUploadFile = () => {
	const inputFile = useRef<HTMLInputElement | null>(null);
	const promiseResolveRef = useRef<(file: File) => void>();

	const promiseRejectRef = useRef<(reason?: any) => void>();

	const handleFocusBack = () => {
		window.removeEventListener('focus', handleFocusBack);
		setTimeout(() => {
			if (promiseRejectRef.current) {
				promiseRejectRef.current(new Error(`Promessa não cumprida`));
			}
		}, 1000);
	};

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		window.removeEventListener('focus', handleFocusBack);
		const selectedFile = event.target.files?.[0];
		if (promiseResolveRef.current) {
			if (selectedFile) {
				promiseResolveRef.current(selectedFile);
			}
		} else if (promiseRejectRef.current) {
			promiseRejectRef.current(new Error(`Promessa não cumprida`));
		}
	};

	const uploadImage = () => {
		inputFile.current?.click();
		return new Promise<File>((resolve, reject) => {
			promiseResolveRef.current = resolve;
			promiseRejectRef.current = reject;
		});
	};

	const addFocus = () => {
		window.addEventListener('focus', handleFocusBack);
	};

	const InputComponent = () => (
		<input
			type="file"
			id="file"
			ref={inputFile}
			style={{ display: 'none' }}
			onChange={handleFileChange}
			onClick={() => {
				addFocus();
			}}
		/>
	);

	return [uploadImage, InputComponent] as const;
};

export default useUploadFile;
