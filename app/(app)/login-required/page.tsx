// Copyright (c) 2024 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

import usePbAuth from '@/hooks/usePbAuth';
import { useRouter, useSearchParams } from 'next/navigation';
import { FunctionComponent, useEffect } from 'react';
import dynamic from 'next/dynamic';

const PageMessage = dynamic(
	() => import('@/components/PageMessage/PageMessage'),
	{
		ssr: true,
	}
);
interface PageProps {}

const Page: FunctionComponent<PageProps> = () => {
	const searchParams = useSearchParams();
	const redirect = searchParams.get('r') ?? '/';
	const [, user] = usePbAuth();
	const router = useRouter();
	useEffect(() => {
		if (user !== null) router.replace(redirect);
	}, [user, router, redirect]);

	if (user === null)
		return (
			<PageMessage message="Ops... Você precisa estar logado para acessar esta página!" />
		);
	else return <PageMessage loading message="Redirecionando, aguarde..." />;
};

export default Page;
