export interface User {
  id: number;
  email: string;
  name: string;
  contactPhone: string;
  role: string;
}

export interface UserSearchAdditional {
  bookRents: Array<{dateEnd: Date}>;
  lastActivity: Date;
}

export type UsersSearch = User & UserSearchAdditional;