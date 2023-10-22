// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
'use client';

import { toast } from 'react-toastify';
import { attachFile, getAttachmentFileURL } from './apiHelpers/attachmentsAPI';
import Compressor from 'compressorjs';

const compressAndUpload = (file: File, articleId: string): Promise<string> => {
	return new Promise<string>((resolve, reject) => {
		const sendForm = async (result: File | Blob) => {
			try {
				if (result.size > 2000000)
					reject(new Error('Imagem muito grande!'));
				const attachmentsRecord = await attachFile(articleId, result);

				const imageUrl = await getAttachmentFileURL(
					articleId,
					attachmentsRecord.files[attachmentsRecord.files.length - 1],
					true
				);

				resolve(imageUrl);
			} catch (error: any) {
				console.error(error.message);

				reject(error);
			}
		};

		new Compressor(file, {
			quality: 0.6,
			maxHeight: 1500,
			maxWidth: 1500,
			success(result) {
				sendForm(result);
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
		const fileUrl = await compressAndUpload(file, articleId);
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
		return fileUrl;
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
