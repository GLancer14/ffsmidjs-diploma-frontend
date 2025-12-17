import connection from ".";
import request from "axios";

// import type { ProjectDataDTO } from "../types/ProjectDataDTO";
// import type { ErrorResponse } from "../types/ErrorResponse";
export interface RentBookDto {
  libraryId: number;
  bookId: number;
  dateStart: number;
  dateEnd?: string;
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
