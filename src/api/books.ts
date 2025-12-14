import connection from ".";
import request from "axios";

// import type { ProjectDataDTO } from "../types/ProjectDataDTO";
// import type { ErrorResponse } from "../types/ErrorResponse";
export interface BookSearchParams {
  library: number;
  author?: string;
  title?: string;
  availableOnly?: boolean;
}

export const getEditorsChoiceBooks = async () => {
  try {
    const projectData = await connection.get("/api/common/books", {
      params: {
        author: "Антон Чехов",
      }
    });
    console.log(projectData)

    return projectData.data;
  } catch(e) {
    console.log(e)
    if (request.isAxiosError(e)) {
      if (e.response?.status === 404) {
        return { message: "not found", status: "error" };
      } else if (e.response?.status === 403) {
        return { message: "forbidden", status: "error" };
      }
    }

    return { message: "error", status: "error" };
  }
};