// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent } from 'react';
import DataTableHandler from './DataTableHandler';
import { FetchType } from '@/types/data-table-type';

interface DataTableProps {
	fetchType: FetchType;
	userId?: string | undefined;
}

const DataTable: FunctionComponent<DataTableProps> = ({
	fetchType,
	userId,
}) => {
	return <DataTableHandler fetchType={fetchType} userId={userId} />;
};

export default DataTable;
