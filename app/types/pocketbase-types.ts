/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Articles = "articles",
	ArticlesStats = "articles_stats",
	Attachments = "attachments",
	Chapters = "chapters",
	ChaptersStats = "chapters_stats",
	KeyWords = "key_words",
	KeyWordsStats = "key_words_stats",
	LatestViews = "latest_views",
	Reports = "reports",
	Tags = "tags",
	TotalUsersArticlesStats = "total_users_articles_stats",
	TotalUsersChaptersStats = "total_users_chapters_stats",
	Users = "users",
	UsersPluginData = "users_plugin_data",
	UsersStats = "users_stats",
	Views = "views",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export enum ArticlesVisibilityOptions {
	"public" = "public",
	"private" = "private",
}
export type ArticlesRecord = {
	attachments?: RecordIdString
	description?: string
	description_slug?: string
	document: string
	key_words?: RecordIdString[]
	slug?: string
	tag: RecordIdString
	title: string
	user: RecordIdString
	views?: RecordIdString
	visibility: ArticlesVisibilityOptions
}

export enum ArticlesStatsVisibilityOptions {
	"public" = "public",
	"private" = "private",
}
export type ArticlesStatsRecord = {
	author_avatar?: string
	author_name: string
	author_username?: string
	description?: string
	description_slug?: string
	document: string
	key_words?: RecordIdString[]
	latest_views?: number
	likes?: number
	slug?: string
	tag: RecordIdString
	title: string
	user: RecordIdString
	views?: number
	visibility: ArticlesStatsVisibilityOptions
	word: string
}

export type AttachmentsRecord = {
	article?: RecordIdString
	files?: string[]
	user?: RecordIdString
}

export enum ChaptersVisibilityOptions {
	"public" = "public",
	"private" = "private",
}
export type ChaptersRecord = {
	articles?: RecordIdString[]
	cover: string
	description?: string
	description_slug?: string
	key_words?: RecordIdString[]
	slug?: string
	tag?: RecordIdString
	title: string
	user: RecordIdString
	views?: RecordIdString
	visibility: ChaptersVisibilityOptions
}

export enum ChaptersStatsVisibilityOptions {
	"public" = "public",
	"private" = "private",
}
export type ChaptersStatsRecord = {
	articles?: RecordIdString[]
	author_avatar?: string
	author_name: string
	author_username?: string
	cover: string
	description?: string
	description_slug?: string
	key_words?: RecordIdString[]
	latest_views?: number
	likes?: number
	slug?: string
	tag?: RecordIdString
	title: string
	user: RecordIdString
	views?: number
	visibility: ChaptersStatsVisibilityOptions
}

export type KeyWordsRecord = {
	user?: RecordIdString
	word: string
}

export type KeyWordsStatsRecord = {
	articles_references?: number
	chapters_references?: number
	word: string
}

export type LatestViewsRecord = {
	articles?: RecordIdString
	chapters?: RecordIdString
	user?: RecordIdString
}

export enum ReportsReasonOptions {
	"Discurso de Ódio" = "Discurso de Ódio",
	"Conteúdo Inadequado para Menores" = "Conteúdo Inadequado para Menores",
	"Spam" = "Spam",
	"Conteúdo Comercial Não Solicitado" = "Conteúdo Comercial Não Solicitado",
	"Desinformação ou Notícias Falsas" = "Desinformação ou Notícias Falsas",
	"Assédio ou Intimidação" = "Assédio ou Intimidação",
	"Violação de Direitos Autorais" = "Violação de Direitos Autorais",
	"Conteúdo Irrelevante ou Fora do Contexto" = "Conteúdo Irrelevante ou Fora do Contexto",
	"Imagens ou Vídeos Explícitos" = "Imagens ou Vídeos Explícitos",
	"Outro Motivo" = "Outro Motivo",
}

export enum ReportsTypeOptions {
	"Artigo" = "Artigo",
	"Capítulo" = "Capítulo",
	"Usuário" = "Usuário",
	"Outro" = "Outro",
}
export type ReportsRecord = {
	author?: RecordIdString
	description: string
	reason: ReportsReasonOptions
	reported_article?: RecordIdString
	reported_chapter?: RecordIdString
	reported_user?: RecordIdString
	type: ReportsTypeOptions
}

export enum TagsCategoryOptions {
	"Ciências Exatas" = "Ciências Exatas",
	"Ciências da Computação" = "Ciências da Computação",
	"Ciências Biológicas" = "Ciências Biológicas",
	"Ciências da Saúde" = "Ciências da Saúde",
	"Ciências Sociais" = "Ciências Sociais",
	"Humanidades" = "Humanidades",
	"Engenharia" = "Engenharia",
	"Economia e Negócios" = "Economia e Negócios",
	"Linguagens e Comunicação" = "Linguagens e Comunicação",
	"Educação" = "Educação",
	"Outro" = "Outro",
}
export type TagsRecord = {
	category: TagsCategoryOptions
	name: string
}

export type TotalUsersArticlesStatsRecord = {
	likes?: number
	num?: number
	username?: string
	views?: number
}

export type TotalUsersChaptersStatsRecord = {
	likes?: number
	num?: number
	username?: string
	views?: number
}

export enum UsersCampusOptions {
	"Apucarana" = "Apucarana",
	"Campo Mourão" = "Campo Mourão",
	"Cornélio Procópio" = "Cornélio Procópio",
	"Curitiba" = "Curitiba",
	"Dois Vizinhos" = "Dois Vizinhos",
	"Francisco Beltrão" = "Francisco Beltrão",
	"Guarapuava" = "Guarapuava",
	"Londrina" = "Londrina",
	"Medianeira" = "Medianeira",
	"Pato Branco" = "Pato Branco",
	"Ponta Grossa" = "Ponta Grossa",
	"Santa Helena" = "Santa Helena",
	"Toledo" = "Toledo",
}
export type UsersRecord = {
	avatar?: string
	campus?: UsersCampusOptions
	course?: string
	description?: string
	favorite_articles?: RecordIdString[]
	favorite_chapters?: RecordIdString[]
	liked_articles?: RecordIdString[]
	liked_chapters?: RecordIdString[]
	name: string
}

export type UsersPluginDataRecord<Tdata = unknown> = {
	article: RecordIdString
	data?: null | Tdata
	plugin: string
	user: RecordIdString
}

export type UsersStatsRecord = {
	avatar?: string
	description?: string
	n_of_articles?: number
	n_of_articles_likes?: number
	n_of_articles_views?: number
	n_of_chapters?: number
	n_of_chapters_likes?: number
	n_of_chapters_views?: number
	name: string
	username?: string
}

export type ViewsRecord = {
	article?: RecordIdString
	chapter?: RecordIdString
	total?: number
}

// Response types include system fields and match responses from the PocketBase API
export type ArticlesResponse<Texpand = unknown> = Required<ArticlesRecord> & BaseSystemFields<Texpand>
export type ArticlesStatsResponse<Texpand = unknown> = Required<ArticlesStatsRecord> & BaseSystemFields<Texpand>
export type AttachmentsResponse<Texpand = unknown> = Required<AttachmentsRecord> & BaseSystemFields<Texpand>
export type ChaptersResponse<Texpand = unknown> = Required<ChaptersRecord> & BaseSystemFields<Texpand>
export type ChaptersStatsResponse<Texpand = unknown> = Required<ChaptersStatsRecord> & BaseSystemFields<Texpand>
export type KeyWordsResponse<Texpand = unknown> = Required<KeyWordsRecord> & BaseSystemFields<Texpand>
export type KeyWordsStatsResponse<Texpand = unknown> = Required<KeyWordsStatsRecord> & BaseSystemFields<Texpand>
export type LatestViewsResponse<Texpand = unknown> = Required<LatestViewsRecord> & BaseSystemFields<Texpand>
export type ReportsResponse<Texpand = unknown> = Required<ReportsRecord> & BaseSystemFields<Texpand>
export type TagsResponse<Texpand = unknown> = Required<TagsRecord> & BaseSystemFields<Texpand>
export type TotalUsersArticlesStatsResponse<Texpand = unknown> = Required<TotalUsersArticlesStatsRecord> & BaseSystemFields<Texpand>
export type TotalUsersChaptersStatsResponse<Texpand = unknown> = Required<TotalUsersChaptersStatsRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>
export type UsersPluginDataResponse<Tdata = unknown, Texpand = unknown> = Required<UsersPluginDataRecord<Tdata>> & BaseSystemFields<Texpand>
export type UsersStatsResponse<Texpand = unknown> = Required<UsersStatsRecord> & BaseSystemFields<Texpand>
export type ViewsResponse<Texpand = unknown> = Required<ViewsRecord> & BaseSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	articles: ArticlesRecord
	articles_stats: ArticlesStatsRecord
	attachments: AttachmentsRecord
	chapters: ChaptersRecord
	chapters_stats: ChaptersStatsRecord
	key_words: KeyWordsRecord
	key_words_stats: KeyWordsStatsRecord
	latest_views: LatestViewsRecord
	reports: ReportsRecord
	tags: TagsRecord
	total_users_articles_stats: TotalUsersArticlesStatsRecord
	total_users_chapters_stats: TotalUsersChaptersStatsRecord
	users: UsersRecord
	users_plugin_data: UsersPluginDataRecord
	users_stats: UsersStatsRecord
	views: ViewsRecord
}

export type CollectionResponses = {
	articles: ArticlesResponse
	articles_stats: ArticlesStatsResponse
	attachments: AttachmentsResponse
	chapters: ChaptersResponse
	chapters_stats: ChaptersStatsResponse
	key_words: KeyWordsResponse
	key_words_stats: KeyWordsStatsResponse
	latest_views: LatestViewsResponse
	reports: ReportsResponse
	tags: TagsResponse
	total_users_articles_stats: TotalUsersArticlesStatsResponse
	total_users_chapters_stats: TotalUsersChaptersStatsResponse
	users: UsersResponse
	users_plugin_data: UsersPluginDataResponse
	users_stats: UsersStatsResponse
	views: ViewsResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'articles'): RecordService<ArticlesResponse>
	collection(idOrName: 'articles_stats'): RecordService<ArticlesStatsResponse>
	collection(idOrName: 'attachments'): RecordService<AttachmentsResponse>
	collection(idOrName: 'chapters'): RecordService<ChaptersResponse>
	collection(idOrName: 'chapters_stats'): RecordService<ChaptersStatsResponse>
	collection(idOrName: 'key_words'): RecordService<KeyWordsResponse>
	collection(idOrName: 'key_words_stats'): RecordService<KeyWordsStatsResponse>
	collection(idOrName: 'latest_views'): RecordService<LatestViewsResponse>
	collection(idOrName: 'reports'): RecordService<ReportsResponse>
	collection(idOrName: 'tags'): RecordService<TagsResponse>
	collection(idOrName: 'total_users_articles_stats'): RecordService<TotalUsersArticlesStatsResponse>
	collection(idOrName: 'total_users_chapters_stats'): RecordService<TotalUsersChaptersStatsResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
	collection(idOrName: 'users_plugin_data'): RecordService<UsersPluginDataResponse>
	collection(idOrName: 'users_stats'): RecordService<UsersStatsResponse>
	collection(idOrName: 'views'): RecordService<ViewsResponse>
}
