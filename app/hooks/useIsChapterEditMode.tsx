// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use-client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

const useIsChapterEditMode = () => {
	const pathname = usePathname();

	const isEdit = useMemo(() => {
		const paths = pathname.split('/');
		if (paths.length < 1) return false;
		return Boolean(paths[paths.length - 1] === 'edit');
	}, [pathname]);

	return [isEdit] as const;
};

export default useIsChapterEditMode;
