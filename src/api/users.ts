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

export interface SearchUserParams {
  limit?: number;
  offset?: number;
  searchString?: string;
}

export const updateSelf = async (params: UserUpdateParams) => {
  try {
    const projectData = await connection.put("/api/self/users", {
      email: params.email,
      name: params.name,
      contactPhone: params.contactPhone,
      password: params.password,
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

export const findUsers = async (params: SearchUserParams) => {
  try {
    console.log(params)
    const usersData = await connection.get("/api/admin/users", {
      params: {
        limit: params.limit,
        offset: params.offset,
        searchString: params.searchString,
      }
    });

    return usersData.data;
  } catch(e) {
    if (request.isAxiosError(e)) {
      if (e.response) {
        return e.response.data;
      }
    }

    return { message: "error", status: "error" };
  }
};