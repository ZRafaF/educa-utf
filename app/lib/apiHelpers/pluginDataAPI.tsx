import { PluginsRecord, PluginsResponse } from '@/types/pocketbase-types';
import pb from '../PocketBase/pocketbase';

export async function createPluginData(pluginData: PluginsRecord) {
	return await pb
		.collection('plugin_data')
		.create<PluginsResponse>(pluginData);
}

export async function getPluginData<Tdata = unknown>(
	uniqueId: string,
	article: string
) {
	return await pb
		.collection('plugin_data')
		.getFirstListItem<PluginsResponse<Tdata>>(
			`article='${article}'&&uniqueId='${uniqueId}'`
		);
}
