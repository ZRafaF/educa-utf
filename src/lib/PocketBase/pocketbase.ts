// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import PocketBase from "pocketbase";

const pb = new PocketBase(process.env.PB_URL);

// const pb: any = null;

export default pb;
