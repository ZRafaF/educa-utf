// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
"use client";

import {
	Dispatch,
	FunctionComponent,
	ReactNode,
	SetStateAction,
	createContext,
	useState,
} from "react";

export const OverlayControllerContext = createContext<
	[boolean, Dispatch<SetStateAction<boolean>>]
>([false, () => {}]);

interface OverlayControllerProps {
	children: ReactNode;
}

const OverlayControllerProvider: FunctionComponent<OverlayControllerProps> = ({
	children,
}) => {
	const [open, setOpen] = useState(false);
	return (
		<OverlayControllerContext.Provider value={[open, setOpen]}>
			{children}
		</OverlayControllerContext.Provider>
	);
};

export default OverlayControllerProvider;
