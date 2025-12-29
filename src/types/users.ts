export interface User {
  id: number;
  email: string;
  name: string;
  contactPhone: string;
  role: string;
}

export type UsersSearch = User & {bookRents: Array<{dateEnd: Date}>};