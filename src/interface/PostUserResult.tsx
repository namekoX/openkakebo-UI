interface PostUserResult {
  info: boolean;
  valid: boolean;
  msg: string;
  user?: User;
}

interface User {
  id: string;
  name: string;
  email: string;
  token: string;
}
export default PostUserResult;