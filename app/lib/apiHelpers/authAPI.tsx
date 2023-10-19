// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { UsersResponse } from '@/types/pocketbase-types';
import pb from '../PocketBase/pocketbase';
import PocketBase, { RecordAuthResponse } from 'pocketbase';

export async function initPocketBaseServerSide(req: any, res: any) {
	const serverPb = new PocketBase(process.env.PB_URL);

	// load the store data from the request cookie string
	serverPb.authStore.loadFromCookie(req?.headers?.cookie || '');

	// send back the default 'pb_auth' cookie to the client with the latest store state
	serverPb.authStore.onChange(() => {
		res?.setHeader('set-cookie', pb.authStore.exportToCookie());
	});

	try {
		// get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
		serverPb.authStore.isValid &&
			(await pb.collection('users').authRefresh());
	} catch (_) {
		// clear the auth store on failed refresh
		serverPb.authStore.clear();
	}

	return serverPb;
}

export async function loginWithPassword(
	usernameOrEmail: string,
	password: string
) {
	return await pb
		.collection('users')
		.authWithPassword<UsersResponse>(usernameOrEmail, password);
}

export async function loginUTFPR(
	username: string,
	password: string
): Promise<RecordAuthResponse<UsersResponse>> {
	const res = await pb.send('/api/educautf/utfpr-auth', {
		method: 'POST',
		body: JSON.stringify({
			username: username,
			password: password,
		}),
	});

	const token = res.token;
	const record = res.record;

	pb.authStore.save(token, record);
	return record;
}

export async function logOut() {
	return await pb.authStore.clear();
}

export async function registerWithPassword(
	usernameOrEmail: string,
	password: string,
	passwordConfirm: string
) {
	return await pb.collection('users').create({
		email: usernameOrEmail,
		password: password,
		passwordConfirm: passwordConfirm,
	});
}
