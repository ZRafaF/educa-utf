/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	Chapters = "chapters",
	ChaptersStats = "chapters_stats",
	Images = "images",
	Posts = "posts",
	PostsStats = "posts_stats",
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

export type ChaptersRecord = {
	title?: string
	user?: RecordIdString
	posts?: RecordIdString[]
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
	post?: RecordIdString
}

export type PostsRecord = {
	title: string
	description?: string
	user: RecordIdString
	visible?: boolean
	document?: string
	cover?: string
	views?: number
	tags?: RecordIdString[]
}

export type PostsStatsRecord = {
	title: string
	likes?: number
	views?: number
	author_name: string
	author_username?: string
	author_avatar?: string
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
	favorite_posts?: RecordIdString[]
	favorite_chapters?: RecordIdString[]
	liked_posts?: RecordIdString[]
	liked_chapters?: RecordIdString[]
	course?: string
	campus?: UsersCampusOptions
}

// Response types include system fields and match responses from the PocketBase API
export type ChaptersResponse<Texpand = unknown> = Required<ChaptersRecord> & BaseSystemFields<Texpand>
export type ChaptersStatsResponse<Texpand = unknown> = Required<ChaptersStatsRecord> & BaseSystemFields<Texpand>
export type ImagesResponse<Texpand = unknown> = Required<ImagesRecord> & BaseSystemFields<Texpand>
export type PostsResponse<Texpand = unknown> = Required<PostsRecord> & BaseSystemFields<Texpand>
export type PostsStatsResponse<Texpand = unknown> = Required<PostsStatsRecord> & BaseSystemFields<Texpand>
export type TagsResponse<Texpand = unknown> = Required<TagsRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	chapters: ChaptersRecord
	chapters_stats: ChaptersStatsRecord
	images: ImagesRecord
	posts: PostsRecord
	posts_stats: PostsStatsRecord
	tags: TagsRecord
	users: UsersRecord
}

export type CollectionResponses = {
	chapters: ChaptersResponse
	chapters_stats: ChaptersStatsResponse
	images: ImagesResponse
	posts: PostsResponse
	posts_stats: PostsStatsResponse
	tags: TagsResponse
	users: UsersResponse
}