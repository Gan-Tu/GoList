interface CurrentUserRequestObject {
  uid: string;
  email?: string | null;
}

declare namespace Express {
  export interface Request {
    token?: string;
    currentUser?: CurrentUserRequestObject;
  }
}
