// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import './globals.css';
import type { Metadata } from 'next';
import AppOverlay from './components/AppOverlay/AppOverlay';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ToastProvider from './contexts/ToastProvider';

export const metadata: Metadata = {
	title: 'EducaUTF',
	description: 'Web aplicação feita por alunos para alunos.',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="pt-br">
			<body
				style={{
					margin: 0,
					minHeight: '100vh',
				}}
			>
				<ToastProvider>
					<AppOverlay>{children}</AppOverlay>
				</ToastProvider>
			</body>
		</html>
	);
}
