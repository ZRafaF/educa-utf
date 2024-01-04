// Copyright (c) 2024 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { UsersResponse } from './pocketbase-types';

export type IncreaseViewsResponseType = {
	message: string;
};

export type UpdateLikedRecordsResponseType = {
	message: string;
	likes: number;
	userRecord: UsersResponse;
};
