// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import './globals.css';
import type { Metadata } from 'next';
import AuthProvider from './contexts/AuthProvider';
import AppOverlay from './components/AppOverlay/AppOverlay';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
export const metadata: Metadata = {
	title: 'Educa UTF',
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
				<AuthProvider>
					<AppOverlay>{children}</AppOverlay>
				</AuthProvider>
			</body>
		</html>
	);
}
