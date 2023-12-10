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
import Providers from './contexts/Providers';
import Script from 'next/script';
import ThemeRegistry from './ThemeRegistry';

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
	metadataBase: new URL('https://educautf.td.utfpr.edu.br'),
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
		<html lang="pt-br" data-color-scheme="light">
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
					padding: 0,
				}}
			>
				<Providers>
					<ThemeRegistry options={{ key: 'mui' }}>
						<AppOverlay>{children}</AppOverlay>
					</ThemeRegistry>
				</Providers>
			</body>
		</html>
	);
}
