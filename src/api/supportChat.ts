import connection from ".";
import request from "axios";

export const getChatData = async (clientId: number) => {
  try {
    const chatData = await connection.get("/api/manager/support-requests", {
      params: {
        user: clientId,
      }
    });

    return chatData.data;
  } catch(e) {
    if (request.isAxiosError(e)) {
      if (e.response) {
        return e.response.data;
      }
    }

    return { message: "error", status: "error" };
  }
};

export const getChatMessages = async (chatId: number) => {
  try {
    const chatData = await connection.get(`/api/manager/${chatId}/support-requests`);

    return chatData.data;
  } catch(e) {
    if (request.isAxiosError(e)) {
      if (e.response) {
        return e.response.data;
      }
    }

    return { message: "error", status: "error" };
  }
};

export const sendMessage = async (supportChatId: number, message: string) => {
  try {
    const messageData = await connection.post(`/api/common/support-requests/${supportChatId}/messages`, {
      text: message,
    });

    return messageData.data;
  } catch(e) {
    if (request.isAxiosError(e)) {
      if (e.response) {
        return e.response.data;
      }
    }

    return { message: "error", status: "error" };
  }
};

export const getClientChat = async (userId: number) => {
  try {
    const chatData = await connection.get(`/api/client/support-requests`);

    return chatData.data;
  } catch(e) {
    if (request.isAxiosError(e)) {
      if (e.response) {
        return e.response.data;
      }
    }

    return { message: "error", status: "error" };
  }
};
