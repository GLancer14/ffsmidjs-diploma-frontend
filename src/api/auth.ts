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

export const register = async (name: string, email: string, password: string) => {
  try {
    console.log("email:", email)
    const userData = await connection.post("/api/auth/register", {
      email,
      name,
      password,
    });

    return userData.data;
  } catch(e) {
    if (request.isAxiosError(e)) {
      if (e.response) {
        return e.response.data;
      }
    }

    return { message: "error", status: "error" };
  }
};

export const login = async (email: string, password: string) => {
  try {
    const userData = await connection.post("/api/auth/login", {
      email,
      password,
    });

    return userData.data;
  } catch(e) {
    if (request.isAxiosError(e)) {
      if (e.response) {
        return e.response.data;
      }
    }

    return { message: "error", status: "error" };
  }
};

export const getLoggedUser = async () => {
  try {
    const userData = await connection.get("/api/auth/me");

    return userData.data;
  } catch(e) {
    if (request.isAxiosError(e)) {
      if (e.response) {
        return e.response.data;
      }
    }

    return { message: "error", status: "error" };
  }
};

export const logout = async () => {
  try {
    const userData = await connection.post("/api/auth/logout");

    return userData.data;
  } catch(e) {
    if (request.isAxiosError(e)) {
      if (e.response) {
        return e.response.data;
      }
    }

    return { message: "error", status: "error" };
  }
};