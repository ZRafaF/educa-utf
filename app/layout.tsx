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
import Script from 'next/script';

export const metadata: Metadata = {
	title: 'EducaUTF',
	description:
		'Web aplicação para criação e compartilhamento de conteúdo acadêmico. Feito por alunos para o mundo :)',
	keywords: ['EducaUTF', 'Educa UTF', 'artigos', 'estudo', 'UTFPR', 'wiki'],

	manifest: '/manifest.json',
	themeColor: '#121212',
	openGraph: {
		images: '/icon-256x256.png',
	},
	twitter: {
		images: '/icon-256x256.png',
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="pt-br">
			<head>
				<link rel="manifest" href="/manifest.json" />
			</head>
			<Script
				src="https://educautf.td.utfpr.edu.br/umami/script.js"
				data-website-id="01024959-6d25-4edb-bee5-95f5cc103bff"
			/>
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
