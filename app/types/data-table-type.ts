// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
export interface Data {
	title: string;
	views: number;
	likes: number;
	created: string;
}

export type Order = 'asc' | 'desc';

export interface HeadCell {
	id: keyof Data;
	label: string;
	icon: JSX.Element;
}

export type FetchType = 'articles' | 'chapters';
