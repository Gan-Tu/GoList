export interface UserMetadata {
  uid: string;
  displayName: string;
  photoURL?: string;
  email?: string;
  emailVerified?: boolean;
}

// To keep in sync with @types/express/index.d.ts
export interface CurrentUserRequestObject {
  uid: string;
  email?: string | null;
}
