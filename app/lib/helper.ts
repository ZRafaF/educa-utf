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
