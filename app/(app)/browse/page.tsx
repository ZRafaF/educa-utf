// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import { redirect } from 'next/navigation';

export default function Page() {
	redirect('/browse/articles');

	return <div>Procurar tudo</div>;
}
