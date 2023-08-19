// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section>
			<div>{children}</div>
		</section>
	);
}
