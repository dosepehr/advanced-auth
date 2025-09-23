export interface UserResponse {
    accessToken: string;
    sessionId: string;
    sessionExpiry: number;
}

export interface JWT {
    username: string;
    fullName: string;
    pic: string;
    exp: number;
}

export interface UserSession extends JWT {
    accessToken: string;
    sessionId: string;
    sessionExpiry: number;
}

export interface logoutDto {
    sessionId: string;
}
export interface refreshDto {
    sessionId: string;
}
