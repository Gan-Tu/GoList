interface currentUser {
  uid: string;
  email?: string | null;
}

declare namespace Express {
  export interface Request {
    currentUser?: currentUser;
  }
}
