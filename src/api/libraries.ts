import connection from ".";
import request from "axios";

// import type { ProjectDataDTO } from "../types/ProjectDataDTO";
// import type { ErrorResponse } from "../types/ErrorResponse";
export interface AddBookParams {
  id: string;
  title: string;
  author: string;
  year?: number;
  description?: string;
  totalCopies: number;
  availableCopies: number;
}

export interface BookSearchParams {
  library: number;
  author?: string;
  title?: string;
  availableOnly?: boolean;
}

export interface SearchLibrariesParams {
  limit?: number;
  offset?: number;
  searchString?: string;
}

export interface LibrariesSearchResponseDto {
  id: number;
  name: string;
  address: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  totalCopies: number;
  availableCopies: number;
}

export interface CreateLibraryParams {
  name: string;
  address: string;
  description?: string;
}

export interface UpdateLibraryParams {
  id: number;
  name?: string;
  address?: string;
  description?: string;
}

export const getEditorsChoiceBooks = async () => {
  try {
    const projectData = await connection.get("/api/common/books", {
      params: {
        library: 4,
        author: "Федор Достоевский",
      }
    });

    return projectData.data;
  } catch(e) {
    if (request.isAxiosError(e)) {
      if (e.response) {
        return e.response.data;
      }
    }

    return { message: "error", status: "error" };
  }
};

export const getNewIncomings = async () => {
  try {
    const projectData = await connection.get("/api/common/books", {
      params: {
        library: 3,
        author: "Антон Чехов",
      }
    });

    return projectData.data;
  } catch(e) {
    if (request.isAxiosError(e)) {
      if (e.response) {
        return e.response.data;
      }
    }

    return { message: "error", status: "error" };
  }
};

export const findBooks = async (title: string, author: string) => {
  try {
    const projectData = await connection.get("/api/common/books", {
      params: {
        title,
        author,
      }
    });

    return projectData.data;
  } catch(e) {
    if (request.isAxiosError(e)) {
      if (e.response) {
        return e.response.data;
      }
    }

    return { message: "error", status: "error" };
  }
};

export const getBookById = async (id: string) => {
  try {
    const projectData = await connection.get(`/api/common/books/${id}`);

    return projectData.data;
  } catch(e) {
    if (request.isAxiosError(e)) {
      if (e.response) {
        return e.response.data;
      }
    }

    return { message: "error", status: "error" };
  }
};

export  const getBooksCount = async () => {
  try {
    const booksData = await connection.get(`/api/common/books-count/`);

    return booksData.data;
  } catch(e) {
    if (request.isAxiosError(e)) {
      if (e.response) {
        return e.response.data;
      }
    }

    return { message: "error", status: "error" };
  }
};

export const addBook = async (form: FormData) => {
  try {
    const bookData = await connection.post(`/api/admin/books/`, form, 
      {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      }
    );

    return bookData.data;
  } catch(e) {
    if (request.isAxiosError(e)) {
      if (e.response) {
        return e.response.data;
      }
    }

    return { message: "error", status: "error" };
  }
};

export const updateBook = async (form: FormData) => {
  try {
    const bookData = await connection.put(`/api/admin/books/`, form, 
      {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      }
    );

    return bookData.data;
  } catch(e) {
    if (request.isAxiosError(e)) {
      if (e.response) {
        return e.response.data;
      }
    }

    return { message: "error", status: "error" };
  }
};

export const deleteBook = async (bookId: number) => {
  try {
    const bookData = await connection.delete(`/api/admin/books/${bookId}`);

    return bookData.data;
  } catch(e) {
    if (request.isAxiosError(e)) {
      if (e.response) {
        return e.response.data;
      }
    }

    return { message: "error", status: "error" };
  }
};

export const getLibraryById = async (id: string) => {
  try {
    const projectData = await connection.get(`/api/common/libraries/${id}`);

    return projectData.data;
  } catch(e) {
    if (request.isAxiosError(e)) {
      if (e.response) {
        return e.response.data;
      }
    }

    return { message: "error", status: "error" };
  }
};

export const getLibrariesCount = async (params: { searchString: string }) => {
  try {
    const librariesData = await connection.get(`/api/common/libraries-count/`, {
      params: {
        searchString: params.searchString
      }
    });

    return librariesData.data;
  } catch(e) {
    if (request.isAxiosError(e)) {
      if (e.response) {
        return e.response.data;
      }
    }

    return { message: "error", status: "error" };
  }
};

export const getLibraries = async (params: SearchLibrariesParams) => {
  try {
    const librariesData = await connection.get(`/api/common/libraries/`, {
      params: {
        limit: params.limit,
        offset: params.offset,
        searchString: params.searchString,
      }
    });

    return librariesData.data;
  } catch(e) {
    if (request.isAxiosError(e)) {
      if (e.response) {
        return e.response.data;
      }
    }

    return { message: "error", status: "error" };
  }
};

export const createLibrary = async (params: CreateLibraryParams) => {
  try {
    const libraryData = await connection.post(`/api/admin/libraries/`, {
      name: params.name,
      address: params.address,
      description: params.description,
    });

    return libraryData.data;
  } catch(e) {
    if (request.isAxiosError(e)) {
      if (e.response) {
        return e.response.data;
      }
    }

    return { message: "error", status: "error" };
  }
};

export const updateLibrary = async (params: UpdateLibraryParams) => {
  try {
    const libraryData = await connection.put(`/api/admin/libraries/`, {
      id: params.id,
      name: params.name,
      address: params.address,
      description: params.description,
    });

    return libraryData.data;
  } catch(e) {
    if (request.isAxiosError(e)) {
      if (e.response) {
        return e.response.data;
      }
    }

    return { message: "error", status: "error" };
  }
};

export const deleteLibrary = async (libraryId: number) => {
  try {
    const libraryData = await connection.delete(`/api/admin/libraries/${libraryId}`);

    return libraryData.data;
  } catch(e) {
    if (request.isAxiosError(e)) {
      if (e.response) {
        console.log(e.response.data);
        return e.response.data;
      }
    }

    return { message: "error", status: "error" };
  }
};