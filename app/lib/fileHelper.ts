// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
'use client';

import { toast } from 'react-toastify';
import { uploadAndGetURL } from './apiHelpers/attachmentsAPI';
import Compressor from 'compressorjs';

export const compressImage = (
	file: File | Blob,
	options: Compressor.Options = {
		quality: 0.75,
		maxHeight: 1500,
		maxWidth: 1500,
	}
): Promise<File | Blob> => {
	return new Promise<File | Blob>((resolve, reject) => {
		new Compressor(file, {
			...options,
			success(result) {
				resolve(result);
			},
			error(error) {
				console.error(error.message);
				reject(error);
			},
		});
	});
};

export const uploadFile = async (file: File, articleId: string) => {
	const id = toast.loading('Fazendo upload do arquivo, aguarde...');
	try {
		const compressedImage = await compressImage(file);
		const url = await uploadAndGetURL(compressedImage, articleId);

		toast.update(id, {
			render: 'Arquivo enviado com sucesso!',
			type: 'success',
			isLoading: false,
			autoClose: 5000,
			pauseOnFocusLoss: true,
			draggable: true,
			pauseOnHover: true,
			closeOnClick: true,
		});
		return url;
	} catch (error) {
		toast.update(id, {
			render: 'Algo deu errado!',
			type: 'error',
			isLoading: false,
			autoClose: 5000,
			pauseOnFocusLoss: true,
			draggable: true,
			pauseOnHover: true,
			closeOnClick: true,
		});
		throw new Error('Error message ' + error);
	}
};
