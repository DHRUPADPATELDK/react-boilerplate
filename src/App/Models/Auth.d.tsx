declare namespace Auth {
  export interface Object {
    [key: string]: any;
    accessToken: string;
    user: User.Object;
  }
}
