export interface ICreateUser {
  email: string;
  username: string;
  pwd: string;
  repeatPwd: string;
  profileUrl?: string;
}
