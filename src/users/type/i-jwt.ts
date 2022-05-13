export interface JwtPayload {
  email: string;
}

export interface JwtDecodePayload extends JwtPayload {
  iat: number;
  exp: number;
}
