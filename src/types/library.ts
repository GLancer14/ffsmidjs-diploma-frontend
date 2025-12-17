export interface Book {
  id: number;
  title: string;
  author: string;
  year?: number;
  description?: string;
  coverImage?: string;
  library: BookOnLibrary[];
}

export interface BookOnLibrary {
  bookId: number;
  libraryId: number;
  totalCopies: number;
  availableCopies: number;
  isAvailable: boolean;
  library: Library;
}

export interface Library {
  id: number;
  name: string;
  address: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}