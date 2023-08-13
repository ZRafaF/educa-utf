// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
"use client";

import React, { FunctionComponent } from "react";
import { ToastContainer } from "react-toastify";

interface ToastProviderProps {
	children: React.ReactNode;
}

const ToastProvider: FunctionComponent<ToastProviderProps> = ({ children }) => {
	return (
		<>
			<ToastContainer />
			{children}
		</>
	);
};

export default ToastProvider;
