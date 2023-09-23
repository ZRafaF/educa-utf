// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ToastProviderProps {
	children: React.ReactNode;
}

export default function ToastProvider({ children }: ToastProviderProps) {
	return (
		<>
			{children}
			<ToastContainer />
		</>
	);
}
