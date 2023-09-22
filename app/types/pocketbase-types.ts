/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	ArticleStats = "article_stats",
	Articles = "articles",
	Chapters = "chapters",
	ChaptersStats = "chapters_stats",
	Images = "images",
	Tags = "tags",
	Users = "users",
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

export type ArticleStatsRecord = {
	title: string
	likes?: number
	views?: number
	author_name: string
	author_username?: string
	author_avatar?: string
}

export type ArticlesRecord = {
	title: string
	description?: string
	user: RecordIdString
	visible?: boolean
	document?: string
	cover?: string
	views?: number
	tags?: RecordIdString[]
}

export type ChaptersRecord = {
	title?: string
	user?: RecordIdString
	articles?: RecordIdString[]
	visible?: boolean
	description?: string
	tags?: RecordIdString[]
	views?: number
}

export type ChaptersStatsRecord = {
	title?: string
	likes?: number
	views?: number
	author_name: string
	author_username?: string
	author_avatar?: string
}

export type ImagesRecord = {
	file?: string
	article?: RecordIdString
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
	name: string
	avatar?: string
	favorite_articles?: RecordIdString[]
	favorite_chapters?: RecordIdString[]
	liked_articles?: RecordIdString[]
	liked_chapters?: RecordIdString[]
	course?: string
	campus?: UsersCampusOptions
}

// Response types include system fields and match responses from the PocketBase API
export type ArticleStatsResponse<Texpand = unknown> = Required<ArticleStatsRecord> & BaseSystemFields<Texpand>
export type ArticlesResponse<Texpand = unknown> = Required<ArticlesRecord> & BaseSystemFields<Texpand>
export type ChaptersResponse<Texpand = unknown> = Required<ChaptersRecord> & BaseSystemFields<Texpand>
export type ChaptersStatsResponse<Texpand = unknown> = Required<ChaptersStatsRecord> & BaseSystemFields<Texpand>
export type ImagesResponse<Texpand = unknown> = Required<ImagesRecord> & BaseSystemFields<Texpand>
export type TagsResponse<Texpand = unknown> = Required<TagsRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	article_stats: ArticleStatsRecord
	articles: ArticlesRecord
	chapters: ChaptersRecord
	chapters_stats: ChaptersStatsRecord
	images: ImagesRecord
	tags: TagsRecord
	users: UsersRecord
}

export type CollectionResponses = {
	article_stats: ArticleStatsResponse
	articles: ArticlesResponse
	chapters: ChaptersResponse
	chapters_stats: ChaptersStatsResponse
	images: ImagesResponse
	tags: TagsResponse
	users: UsersResponse
}