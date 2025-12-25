import connection from ".";
import request from "axios";

// import type { ProjectDataDTO } from "../types/ProjectDataDTO";
// import type { ErrorResponse } from "../types/ErrorResponse";
export interface RentBookDto {
  libraryId: number;
  bookId: number;
  dateStart: string;
  dateEnd: string;
}

export const rentBook = async (rentBookData: RentBookDto) => {
  try {
    const projectData = await connection.post("/api/client/rentals", rentBookData);

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

export const findBookRent = async (id: string) => {
  try {
    const rentData = await connection.get(`/api/client/rentals/${id}`);

    return rentData.data;
  } catch(e) {
    if (request.isAxiosError(e)) {
      if (e.response) {
        return e.response.data;
      }
    }

    return { message: "error", status: "error" };
  }
};

export const findUserBookRents = async (userId: number) => {
  try {
    const rentData = await connection.get(`/api/common/rentals`, {
      params: {
        userId: userId,
      }
    });

    return rentData.data;
  } catch(e) {
    if (request.isAxiosError(e)) {
      if (e.response) {
        return e.response.data;
      }
    }

    return { message: "error", status: "error" };
  }
};


export const getRentsCountForWelcome = async (userId: number) => {
  try {
    const rentData = await connection.get(`/api/common/rentals-count`, {
      params: {
        userId,
      }
    });

    return rentData.data;
  } catch(e) {
    if (request.isAxiosError(e)) {
      if (e.response) {
        return e.response.data;
      }
    }

    return { message: "error", status: "error" };
  }
};

export const getClientOwnRents = async () => {
  try {
    const rentData = await connection.get(`/api/client/rentals`);

    return rentData.data;
  } catch(e) {
    if (request.isAxiosError(e)) {
      if (e.response) {
        return e.response.data;
      }
    }

    return { message: "error", status: "error" };
  }
};