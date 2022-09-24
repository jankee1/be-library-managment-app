export interface LoginResponse {
    id: string,
	firstName: string
	lastName: string
	email: string
	role: number
	fees: number
	createdAt: Date
	jwtAccessToken: string
}