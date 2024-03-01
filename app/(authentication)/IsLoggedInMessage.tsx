'use client';
import PageMessage from '@/components/PageMessage/PageMessage';
import usePbAuth from '@/hooks/usePbAuth';
import { FunctionComponent, ReactNode } from 'react';

interface IsLoggedInMessageProps {
	children: ReactNode;
}

const IsLoggedInMessage: FunctionComponent<IsLoggedInMessageProps> = ({
	children,
}) => {
	const [, user] = usePbAuth();
	if (user) {
		return <PageMessage message="Ops. Parece que você já está logado..." />;
	}
	return children;
};

export default IsLoggedInMessage;
