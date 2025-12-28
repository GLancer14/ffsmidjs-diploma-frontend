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

export interface BookRentalResponseDto {
  id: number;
  userId: number;
  library: {
    name?: string;
    address?: string;
  };
  book: {
    title?: string;
    author?: string;
    coverImage?: string;
  };
  dateStart: string;
  dateEnd: string;
  status: string;
}