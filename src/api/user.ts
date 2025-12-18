import connection from ".";
import request from "axios";

// import type { ProjectDataDTO } from "../types/ProjectDataDTO";
// import type { ErrorResponse } from "../types/ErrorResponse";
export interface UserUpdateParams {
  email?: string;
  name?: string;
  contactPhone?: string;
  password?: string;
}

export const updateSelf = async (params: UserUpdateParams) => {
  try {
    const projectData = await connection.put("/api/common/books", {
      params: {
        email: params.email,
        name: params.name,
        contactPhone: params.contactPhone,
        password: params.password,
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