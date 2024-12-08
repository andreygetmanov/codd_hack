import type { CancelablePromise } from './core/CancelablePromise';
import { OpenAPI } from './core/OpenAPI';
import { request as __request } from './core/request';

import type { Body_login_login_access_token,Message,NewPassword,Token,UserPublic,UpdatePassword,UserCreate,UserRegister,UsersPublic,UserUpdate,UserUpdateMe,ItemCreate,ItemPublic,ItemsPublic,ItemUpdate,Camera,CamerasPublic,Apart,ApartBase,ApartList,LogsApp,LogsAppBase,LogsList,Bulvar,BulvarBase,BulvarList } from './models';

export type TDataLoginAccessToken = {
                formData: Body_login_login_access_token
                
            }
export type TDataRecoverPassword = {
                email: string
                
            }
export type TDataResetPassword = {
                requestBody: NewPassword
                
            }
export type TDataRecoverPasswordHtmlContent = {
                email: string
                
            }

export class LoginService {

	/**
	 * Login Access Token
	 * OAuth2 compatible token login, get an access token for future requests
	 * @returns Token Successful Response
	 * @throws ApiError
	 */
	public static loginAccessToken(data: TDataLoginAccessToken): CancelablePromise<Token> {
		const {
formData,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/api/v1/login/access-token',
			formData: formData,
			mediaType: 'application/x-www-form-urlencoded',
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Test Token
	 * Test access token
	 * @returns UserPublic Successful Response
	 * @throws ApiError
	 */
	public static testToken(): CancelablePromise<UserPublic> {
				return __request(OpenAPI, {
			method: 'POST',
			url: '/api/v1/login/test-token',
		});
	}

	/**
	 * Recover Password
	 * Password Recovery
	 * @returns Message Successful Response
	 * @throws ApiError
	 */
	public static recoverPassword(data: TDataRecoverPassword): CancelablePromise<Message> {
		const {
email,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/api/v1/password-recovery/{email}',
			path: {
				email
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Reset Password
	 * Reset password
	 * @returns Message Successful Response
	 * @throws ApiError
	 */
	public static resetPassword(data: TDataResetPassword): CancelablePromise<Message> {
		const {
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/api/v1/reset-password/',
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Recover Password Html Content
	 * HTML Content for Password Recovery
	 * @returns string Successful Response
	 * @throws ApiError
	 */
	public static recoverPasswordHtmlContent(data: TDataRecoverPasswordHtmlContent): CancelablePromise<string> {
		const {
email,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/api/v1/password-recovery-html-content/{email}',
			path: {
				email
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

}

export type TDataReadUsers = {
                limit?: number
skip?: number
                
            }
export type TDataCreateUser = {
                requestBody: UserCreate
                
            }
export type TDataUpdateUserMe = {
                requestBody: UserUpdateMe
                
            }
export type TDataUpdatePasswordMe = {
                requestBody: UpdatePassword
                
            }
export type TDataRegisterUser = {
                requestBody: UserRegister
                
            }
export type TDataReadUserById = {
                userId: string
                
            }
export type TDataUpdateUser = {
                requestBody: UserUpdate
userId: string
                
            }
export type TDataDeleteUser = {
                userId: string
                
            }

export class UsersService {

	/**
	 * Read Users
	 * Retrieve users.
	 * @returns UsersPublic Successful Response
	 * @throws ApiError
	 */
	public static readUsers(data: TDataReadUsers = {}): CancelablePromise<UsersPublic> {
		const {
limit = 100,
skip = 0,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/api/v1/users/',
			query: {
				skip, limit
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Create User
	 * Create new user.
	 * @returns UserPublic Successful Response
	 * @throws ApiError
	 */
	public static createUser(data: TDataCreateUser): CancelablePromise<UserPublic> {
		const {
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/api/v1/users/',
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Read User Me
	 * Get current user.
	 * @returns UserPublic Successful Response
	 * @throws ApiError
	 */
	public static readUserMe(): CancelablePromise<UserPublic> {
				return __request(OpenAPI, {
			method: 'GET',
			url: '/api/v1/users/me',
		});
	}

	/**
	 * Delete User Me
	 * Delete own user.
	 * @returns Message Successful Response
	 * @throws ApiError
	 */
	public static deleteUserMe(): CancelablePromise<Message> {
				return __request(OpenAPI, {
			method: 'DELETE',
			url: '/api/v1/users/me',
		});
	}

	/**
	 * Update User Me
	 * Update own user.
	 * @returns UserPublic Successful Response
	 * @throws ApiError
	 */
	public static updateUserMe(data: TDataUpdateUserMe): CancelablePromise<UserPublic> {
		const {
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'PATCH',
			url: '/api/v1/users/me',
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Update Password Me
	 * Update own password.
	 * @returns Message Successful Response
	 * @throws ApiError
	 */
	public static updatePasswordMe(data: TDataUpdatePasswordMe): CancelablePromise<Message> {
		const {
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'PATCH',
			url: '/api/v1/users/me/password',
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Register User
	 * Create new user without the need to be logged in.
	 * @returns UserPublic Successful Response
	 * @throws ApiError
	 */
	public static registerUser(data: TDataRegisterUser): CancelablePromise<UserPublic> {
		const {
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/api/v1/users/signup',
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Read User By Id
	 * Get a specific user by id.
	 * @returns UserPublic Successful Response
	 * @throws ApiError
	 */
	public static readUserById(data: TDataReadUserById): CancelablePromise<UserPublic> {
		const {
userId,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/api/v1/users/{user_id}',
			path: {
				user_id: userId
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Update User
	 * Update a user.
	 * @returns UserPublic Successful Response
	 * @throws ApiError
	 */
	public static updateUser(data: TDataUpdateUser): CancelablePromise<UserPublic> {
		const {
requestBody,
userId,
} = data;
		return __request(OpenAPI, {
			method: 'PATCH',
			url: '/api/v1/users/{user_id}',
			path: {
				user_id: userId
			},
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Delete User
	 * Delete a user.
	 * @returns Message Successful Response
	 * @throws ApiError
	 */
	public static deleteUser(data: TDataDeleteUser): CancelablePromise<Message> {
		const {
userId,
} = data;
		return __request(OpenAPI, {
			method: 'DELETE',
			url: '/api/v1/users/{user_id}',
			path: {
				user_id: userId
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

}

export type TDataTestEmail = {
                emailTo: string
                
            }

export class UtilsService {

	/**
	 * Test Email
	 * Test emails.
	 * @returns Message Successful Response
	 * @throws ApiError
	 */
	public static testEmail(data: TDataTestEmail): CancelablePromise<Message> {
		const {
emailTo,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/api/v1/utils/test-email/',
			query: {
				email_to: emailTo
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Health Check
	 * @returns boolean Successful Response
	 * @throws ApiError
	 */
	public static healthCheck(): CancelablePromise<boolean> {
				return __request(OpenAPI, {
			method: 'GET',
			url: '/api/v1/utils/health-check/',
		});
	}

}

export type TDataReadItems = {
                limit?: number
skip?: number
                
            }
export type TDataCreateItem = {
                requestBody: ItemCreate
                
            }
export type TDataReadItem = {
                id: string
                
            }
export type TDataUpdateItem = {
                id: string
requestBody: ItemUpdate
                
            }
export type TDataDeleteItem = {
                id: string
                
            }

export class ItemsService {

	/**
	 * Read Items
	 * Retrieve items.
	 * @returns ItemsPublic Successful Response
	 * @throws ApiError
	 */
	public static readItems(data: TDataReadItems = {}): CancelablePromise<ItemsPublic> {
		const {
limit = 100,
skip = 0,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/api/v1/items/',
			query: {
				skip, limit
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Create Item
	 * Create new item.
	 * @returns ItemPublic Successful Response
	 * @throws ApiError
	 */
	public static createItem(data: TDataCreateItem): CancelablePromise<ItemPublic> {
		const {
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/api/v1/items/',
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Read Item
	 * Get item by ID.
	 * @returns ItemPublic Successful Response
	 * @throws ApiError
	 */
	public static readItem(data: TDataReadItem): CancelablePromise<ItemPublic> {
		const {
id,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/api/v1/items/{id}',
			path: {
				id
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Update Item
	 * Update an item.
	 * @returns ItemPublic Successful Response
	 * @throws ApiError
	 */
	public static updateItem(data: TDataUpdateItem): CancelablePromise<ItemPublic> {
		const {
id,
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'PUT',
			url: '/api/v1/items/{id}',
			path: {
				id
			},
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Delete Item
	 * Delete an item.
	 * @returns Message Successful Response
	 * @throws ApiError
	 */
	public static deleteItem(data: TDataDeleteItem): CancelablePromise<Message> {
		const {
id,
} = data;
		return __request(OpenAPI, {
			method: 'DELETE',
			url: '/api/v1/items/{id}',
			path: {
				id
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

}

export type TDataReadCameras = {
                limit?: number
skip?: number
                
            }
export type TDataReadCamera = {
                id: number
                
            }

export class CamerasService {

	/**
	 * Read Cameras
	 * Retrieve items.
	 * @returns CamerasPublic Successful Response
	 * @throws ApiError
	 */
	public static readCameras(data: TDataReadCameras = {}): CancelablePromise<CamerasPublic> {
		const {
limit = 100,
skip = 0,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/api/v1/cameras/',
			query: {
				skip, limit
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Read Camera
	 * @returns Camera Successful Response
	 * @throws ApiError
	 */
	public static readCamera(data: TDataReadCamera): CancelablePromise<Camera> {
		const {
id,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/api/v1/cameras/{id}',
			path: {
				id
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

}

export type TDataReadAparts = {
                limit?: number
skip?: number
                
            }
export type TDataReadApart = {
                idRep: number
                
            }
export type TDataCreateApart = {
                requestBody: ApartBase
                
            }
export type TDataCheckedApart = {
                idRep: number
                
            }

export class ApartsService {

	/**
	 * Read Aparts
	 * @returns ApartList Successful Response
	 * @throws ApiError
	 */
	public static readAparts(data: TDataReadAparts = {}): CancelablePromise<ApartList> {
		const {
limit = 100,
skip = 0,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/api/v1/aparts/',
			query: {
				skip, limit
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Read Apart
	 * @returns Apart Successful Response
	 * @throws ApiError
	 */
	public static readApart(data: TDataReadApart): CancelablePromise<Apart> {
		const {
idRep,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/api/v1/aparts/{id}',
			query: {
				id_rep: idRep
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Create Apart
	 * @returns Apart Successful Response
	 * @throws ApiError
	 */
	public static createApart(data: TDataCreateApart): CancelablePromise<Apart> {
		const {
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/api/v1/aparts/create',
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Checked Apart
	 * @returns Apart Successful Response
	 * @throws ApiError
	 */
	public static checkedApart(data: TDataCheckedApart): CancelablePromise<Apart> {
		const {
idRep,
} = data;
		return __request(OpenAPI, {
			method: 'PUT',
			url: '/api/v1/aparts/checked',
			query: {
				id_rep: idRep
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

}

export type TDataGetLogApp = {
                idLog: number
                
            }
export type TDataGetLogsApp = {
                endDate?: string | null
limit?: number
obj?: string | null
skip?: number
startDate?: string | null
userUid?: string | null
                
            }
export type TDataCreateLogApp = {
                requestBody: LogsAppBase
                
            }
export type TDataExportLogsToCsv = {
                endDate?: string | null
object?: string | null
startDate?: string | null
userUid?: string | null
                
            }

export class ApplogsService {

	/**
	 * Get Log App
	 * @returns LogsApp Successful Response
	 * @throws ApiError
	 */
	public static getLogApp(data: TDataGetLogApp): CancelablePromise<LogsApp> {
		const {
idLog,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/api/v1/applogs/{id}',
			query: {
				id_log: idLog
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Get Logs App
	 * @returns LogsList Successful Response
	 * @throws ApiError
	 */
	public static getLogsApp(data: TDataGetLogsApp = {}): CancelablePromise<LogsList> {
		const {
endDate,
limit = 100,
obj,
skip = 0,
startDate,
userUid,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/api/v1/applogs/',
			query: {
				skip, limit, obj, user_uid: userUid, start_date: startDate, end_date: endDate
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Create Log App
	 * @returns LogsApp Successful Response
	 * @throws ApiError
	 */
	public static createLogApp(data: TDataCreateLogApp): CancelablePromise<LogsApp> {
		const {
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/api/v1/applogs/create',
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Export Logs To Csv
	 * @returns any Successful Response
	 * @throws ApiError
	 */
	public static exportLogsToCsv(data: TDataExportLogsToCsv = {}): CancelablePromise<any> {
		const {
endDate,
object,
startDate,
userUid,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/api/v1/applogs/csv/',
			query: {
				object, user_uid: userUid, start_date: startDate, end_date: endDate
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

}

export type TDataCreateBulvar = {
                requestBody: BulvarBase
                
            }
export type TDataReadBulvars = {
                limit?: number
skip?: number
                
            }
export type TDataDepoBulvars = {
                depo: string
                
            }

export class BulvarsService {

	/**
	 * Create Bulvar
	 * @returns Bulvar Successful Response
	 * @throws ApiError
	 */
	public static createBulvar(data: TDataCreateBulvar): CancelablePromise<Bulvar> {
		const {
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/api/v1/bulvars/create',
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Read Bulvars
	 * @returns BulvarList Successful Response
	 * @throws ApiError
	 */
	public static readBulvars(data: TDataReadBulvars = {}): CancelablePromise<BulvarList> {
		const {
limit = 100,
skip = 0,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/api/v1/bulvars/',
			query: {
				skip, limit
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Depo Bulvars
	 * @returns BulvarList Successful Response
	 * @throws ApiError
	 */
	public static depoBulvars(data: TDataDepoBulvars): CancelablePromise<BulvarList> {
		const {
depo,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/api/v1/bulvars/depo',
			query: {
				depo
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

}