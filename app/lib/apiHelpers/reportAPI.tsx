import { ReportsRecord } from '@/types/pocketbase-types';
import pb from '../PocketBase/pocketbase';

export async function createReport(report: ReportsRecord) {
	return await pb.collection('reports').create(report);
}
