// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getInitColorSchemeScript } from '@mui/material/styles';
import pb from '@/lib/PocketBase/pocketbase';
import { useEffect } from 'react';
import { logOut } from '@/lib/apiHelpers/authAPI';
import { usePathname } from 'next/navigation';

interface ProvidersProps {
	children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
	// FIXME - This is not working and is triggering a loop

	// const pathname = usePathname();
	// useEffect(() => {
	// 	if (!pb.authStore.isValid) {
	// 		logOut().then(() => {
	// 			window.location.reload();
	// 			console.log(pathname);
	// 		});
	// 	}
	// }, [pathname]);

	return (
		<>
			{getInitColorSchemeScript()}

			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="colored"
			/>
			{children}
		</>
	);
}
