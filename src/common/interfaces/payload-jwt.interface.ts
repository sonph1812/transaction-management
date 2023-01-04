export interface PayloadJwt {
  iat?: number;
  exp?: number;
  uId: string;
  name?: string;
  data: any;
  tokenBearer?: string;
}
