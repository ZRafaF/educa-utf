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
	const record = await pb
		.collection('attachments')
		.getOne<AttachmentsResponse>(articleId);

	return record.files.map((file) =>
		pb.files.getUrl(record, file, original ? {} : { thumb: '300x300' })
	);
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
