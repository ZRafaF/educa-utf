// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import PocketBase from 'pocketbase';

const pb = new PocketBase(process.env.PB_URL);

pb.autoCancellation(false);

export default pb;
