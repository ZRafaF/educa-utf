import Container from '@mui/material/Container/Container';
import { FunctionComponent } from 'react';
import type { Metadata } from 'next/types';
import Typography from '@mui/material/Typography';

import {
	ReportsReasonOptions,
	ReportsTypeOptions,
} from '@/types/pocketbase-types';
import ReportForm from './ReportForm';

export const metadata: Metadata = {
	title: 'Reportar - EducaUTF',
	description: 'Reportar conteúdo do EducaUTF.',
	keywords: ['EducaUTF', 'Educa UTF', 'report', 'reportar'],
};

interface PageProps {
	searchParams?: { [key: string]: string | string[] | undefined };
}

const Page: FunctionComponent<PageProps> = ({ searchParams }) => {
	const searchParamType = String(searchParams?.type ?? '');

	const defaultId = String(searchParams?.id ?? '');
	const availableTypes = Object.keys(ReportsTypeOptions).map(
		(key) => ReportsTypeOptions[key as keyof typeof ReportsTypeOptions]
	);
	const defaultType = availableTypes.includes(
		searchParamType as ReportsTypeOptions
	)
		? (searchParamType as ReportsTypeOptions)
		: ReportsTypeOptions.Outro;
	const availableReasons = Object.keys(ReportsReasonOptions).map(
		(key) => ReportsReasonOptions[key as keyof typeof ReportsReasonOptions]
	);
	return (
		<Container maxWidth={'lg'} sx={{ py: 4, flexGrow: 1 }}>
			<Typography component="h1" variant="h4" align="center" pb={2}>
				Reportar
			</Typography>
			<ReportForm
				availableTypes={availableTypes}
				defaultId={defaultId}
				defaultType={defaultType}
				availableReasons={availableReasons}
			/>
		</Container>
	);
};

export default Page;
