import {
	PluginsRecord,
	PluginsResponse,
	UsersPluginDataResponse,
} from '@/types/pocketbase-types';
import pb from '../PocketBase/pocketbase';

export async function createPlugin(pluginData: PluginsRecord) {
	return await pb.collection('plugins').create<PluginsResponse>(pluginData);
}

export async function getPluginData<Tdata = unknown>(uniqueId: string) {
	return await pb
		.collection('plugins')
		.getOne<PluginsResponse<Tdata>>(uniqueId);
}

export async function createUsersPluginData(
	pluginId: string,
	userId: string,
	data: object | null
) {
	return pb.collection('users_plugin_data').create<UsersPluginDataResponse>({
		plugin: pluginId,
		user: userId,
		data: data,
	});
}
