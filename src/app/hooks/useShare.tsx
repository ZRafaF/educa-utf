// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const useShare = (shareData: ShareData) => {
	const share = () => {
		navigator.share(shareData);
	};
	return [share] as const;
};

export default useShare;
