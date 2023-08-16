// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
"use client";

import IconButton from "@mui/material/IconButton";
import { FunctionComponent } from "react";
import ShareIcon from "@mui/icons-material/Share";

interface ShareButtonProps {
	shareData: ShareData;
}

const ShareButton: FunctionComponent<ShareButtonProps> = ({ shareData }) => {
	return (
		<IconButton
			aria-label="share"
			key={"share-post"}
			onClick={() => {
				navigator.share(shareData);
			}}
		>
			<ShareIcon />
		</IconButton>
	);
};

export default ShareButton;
