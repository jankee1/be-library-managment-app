export interface LoginResponse {
    id: string,
	firstName: string
	lastName: string
	email: string
	role: number
	bookedBooks: number
	createdAt: Date
	jwtAccessToken: string
}