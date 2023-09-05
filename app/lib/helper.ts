// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

export function formatString(input: string): string {
	const sanitized = input
		.replace(/\s+/g, "-")
		.replace(/[^a-z0-9\-]/g, "")
		.toLowerCase();
	return sanitized;
}

export async function waitSeconds(time: number = 1) {
	await fetch(`https://hub.dummyapis.com/delay?seconds=${time}`);
}
