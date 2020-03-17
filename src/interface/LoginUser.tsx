interface LoginUser {
  id: number;
  name: string;
  email: string;
  token: string;
  isSocial: boolean;
  statusCd?: number;
}
export default LoginUser;