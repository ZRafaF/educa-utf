/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	Articles = "articles",
	ArticlesStats = "articles_stats",
	Chapters = "chapters",
	ChaptersStats = "chapters_stats",
	Images = "images",
	Tags = "tags",
	Users = "users",
	UsersStats = "users_stats",
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
	cover?: string
	description?: string
	document: string
	tags?: RecordIdString[]
	title: string
	user: RecordIdString
	views?: number
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
	cover?: string
	description?: string
	document: string
	likes?: number
	tags?: RecordIdString[]
	title: string
	user: RecordIdString
	views?: number
	visibility: ArticlesStatsVisibilityOptions
}

export enum ChaptersVisibilityOptions {
	"public" = "public",
	"private" = "private",
}
export type ChaptersRecord = {
	articles?: RecordIdString[]
	description?: string
	tags?: RecordIdString[]
	title?: string
	user: RecordIdString
	views?: number
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
	description?: string
	likes?: number
	tags?: RecordIdString[]
	title?: string
	user: RecordIdString
	views?: number
	visibility: ChaptersStatsVisibilityOptions
}

export type ImagesRecord = {
	article?: RecordIdString
	file?: string
}

export type TagsRecord = {
	name: string
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

export type UsersStatsRecord = {
	avatar?: string
	description?: string
	name: string
	username?: string
}

// Response types include system fields and match responses from the PocketBase API
export type ArticlesResponse<Texpand = unknown> = Required<ArticlesRecord> & BaseSystemFields<Texpand>
export type ArticlesStatsResponse<Texpand = unknown> = Required<ArticlesStatsRecord> & BaseSystemFields<Texpand>
export type ChaptersResponse<Texpand = unknown> = Required<ChaptersRecord> & BaseSystemFields<Texpand>
export type ChaptersStatsResponse<Texpand = unknown> = Required<ChaptersStatsRecord> & BaseSystemFields<Texpand>
export type ImagesResponse<Texpand = unknown> = Required<ImagesRecord> & BaseSystemFields<Texpand>
export type TagsResponse<Texpand = unknown> = Required<TagsRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>
export type UsersStatsResponse<Texpand = unknown> = Required<UsersStatsRecord> & BaseSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	articles: ArticlesRecord
	articles_stats: ArticlesStatsRecord
	chapters: ChaptersRecord
	chapters_stats: ChaptersStatsRecord
	images: ImagesRecord
	tags: TagsRecord
	users: UsersRecord
	users_stats: UsersStatsRecord
}

export type CollectionResponses = {
	articles: ArticlesResponse
	articles_stats: ArticlesStatsResponse
	chapters: ChaptersResponse
	chapters_stats: ChaptersStatsResponse
	images: ImagesResponse
	tags: TagsResponse
	users: UsersResponse
	users_stats: UsersStatsResponse
}