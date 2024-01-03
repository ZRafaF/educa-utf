// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import { AttachmentsResponse } from '@/types/pocketbase-types';
import pb from '../PocketBase/pocketbase';

export async function getAttachmentFilesURL(
	articleId: string,
	original?: boolean
) {
	try {
		const record = await pb
			.collection('attachments')
			.getOne<AttachmentsResponse>(articleId);

		return await record.files.map((file) =>
			pb.files.getUrl(record, file, original ? {} : { thumb: '300x300' })
		);
	} catch (error) {
		console.error(error);
		return [];
	}
}

export async function getAttachmentFileURL(
	articleId: string,
	file: string,
	original?: boolean
) {
	const record = await pb
		.collection('attachments')
		.getOne<AttachmentsResponse>(articleId);

	return pb.files.getUrl(record, file, original ? {} : { thumb: '300x300' });
}

export async function attachFile(articleId: string, file: File | Blob) {
	const form = new FormData();

	form.append('files', file);

	return pb
		.collection('attachments')
		.update<AttachmentsResponse>(articleId, form);
}

export async function uploadAndGetURL(file: File | Blob, articleId: string) {
	if (file.size > 2000000) throw new Error('Imagem muito grande!');
	const attachmentsRecord = await attachFile(articleId, file);

	const imageUrl = await getAttachmentFileURL(
		articleId,
		attachmentsRecord.files[attachmentsRecord.files.length - 1],
		true
	);

	return imageUrl;
}

export async function deleteAttachmentFile(articleId: string, file: string) {
	return await pb.collection('attachments').update(articleId, {
		'files-': [`${file}`],
	});
}
