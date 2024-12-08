export type Apart = {
	latitude: number;
	longitude: number;
	incident: string;
	description?: string | null;
	checked?: boolean;
	last_date?: string;
	last_time?: string;
	id_rep?: number;
};



export type ApartBase = {
	latitude: number;
	longitude: number;
	incident: string;
	description?: string | null;
	checked?: boolean;
};



export type ApartList = {
	data: Array<Apart>;
	count: number;
};



export type Body_login_login_access_token = {
	grant_type?: string | null;
	username: string;
	password: string;
	scope?: string;
	client_id?: string | null;
	client_secret?: string | null;
};



export type Bulvar = {
	nfs: number;
	depo: string;
	lt_loc_start: number;
	ln_loc_start: number;
	lt_loc_end: number;
	ln_loc_end: number;
	id_bul?: number;
	last_date?: string;
	last_time?: string;
};



export type BulvarBase = {
	nfs: number;
	depo: string;
	lt_loc_start: number;
	ln_loc_start: number;
	lt_loc_end: number;
	ln_loc_end: number;
};



export type BulvarList = {
	data: Array<Bulvar>;
	count: number;
};



export type Camera = {
	lt_loc: number;
	ln_loc: number;
	name: string;
	stream?: string | null;
	id_cam?: number;
};



export type CamerasPublic = {
	data: Array<Camera>;
	count: number;
};



export type HTTPValidationError = {
	detail?: Array<ValidationError>;
};



export type ItemCreate = {
	title: string;
	description?: string | null;
};



export type ItemPublic = {
	title: string;
	description?: string | null;
	id: string;
	owner_id: string;
};



export type ItemUpdate = {
	title?: string | null;
	description?: string | null;
};



export type ItemsPublic = {
	data: Array<ItemPublic>;
	count: number;
};



export type LogsApp = {
	object: string;
	action: string;
	comment?: string | null;
	id_log?: number;
	last_date?: string;
	last_time?: string;
};



export type LogsAppBase = {
	object: string;
	action: string;
	comment?: string | null;
};



export type LogsList = {
	data: Array<LogsApp>;
	count: number;
};



export type Message = {
	message: string;
};



export type NewPassword = {
	token: string;
	new_password: string;
};



export type Token = {
	access_token: string;
	token_type?: string;
};



export type UpdatePassword = {
	current_password: string;
	new_password: string;
};



export type UserCreate = {
	email: string;
	is_active?: boolean;
	is_superuser?: boolean;
	full_name?: string | null;
	password: string;
};



export type UserPublic = {
	email: string;
	is_active?: boolean;
	is_superuser?: boolean;
	full_name?: string | null;
	id: string;
};



export type UserRegister = {
	email: string;
	password: string;
	full_name?: string | null;
};



export type UserUpdate = {
	email?: string | null;
	is_active?: boolean;
	is_superuser?: boolean;
	full_name?: string | null;
	password?: string | null;
};



export type UserUpdateMe = {
	full_name?: string | null;
	email?: string | null;
};



export type UsersPublic = {
	data: Array<UserPublic>;
	count: number;
};



export type ValidationError = {
	loc: Array<string | number>;
	msg: string;
	type: string;
};

