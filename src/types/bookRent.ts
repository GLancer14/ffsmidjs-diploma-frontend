export interface BookRent {
  id: number;
  userId: number;
  libraryId: number;
  bookId: number;
  name: string;
  dateStart: string;
  dateEnd: string;
  status: string;
}