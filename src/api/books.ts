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
        library: 6,
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
        availableOnly: true,
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