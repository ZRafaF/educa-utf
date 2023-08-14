// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from "react";

export default function LoginLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <section>{children}</section>;
}
