/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	Chapters = "chapters",
	Images = "images",
	Posts = "posts",
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
	rating?: number
	visible?: boolean
}

export type ImagesRecord = {
	images?: string[]
	user?: RecordIdString
}

export type PostsRecord = {
	title: string
	slug: string
	user: RecordIdString
	rating?: number
	visible?: boolean
	document?: string
	liked_by?: RecordIdString[]
	tags?: string
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
	uploaded_images?: RecordIdString[]
	course?: string
	campus?: UsersCampusOptions
}

// Response types include system fields and match responses from the PocketBase API
export type ChaptersResponse<Texpand = unknown> = Required<ChaptersRecord> & BaseSystemFields<Texpand>
export type ImagesResponse<Texpand = unknown> = Required<ImagesRecord> & BaseSystemFields<Texpand>
export type PostsResponse<Texpand = unknown> = Required<PostsRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	chapters: ChaptersRecord
	images: ImagesRecord
	posts: PostsRecord
	users: UsersRecord
}

export type CollectionResponses = {
	chapters: ChaptersResponse
	images: ImagesResponse
	posts: PostsResponse
	users: UsersResponse
}