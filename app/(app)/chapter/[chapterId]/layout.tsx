// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Container from "@mui/material/Container/Container";

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section>
			<Container>{children}</Container>
		</section>
	);
}
