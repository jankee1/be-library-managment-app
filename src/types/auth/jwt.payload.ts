export type JwtPayload = {
    userId: string;
    email: string;
}
  
export type JwtPayloadDecoded ={
    userId: string;
    email: string;
    exp: number;
    iat: number;
}
  