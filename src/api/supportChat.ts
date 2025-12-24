import connection from ".";
import request from "axios";

export const getChatData = async (companionUserId: number) => {
  try {
    const chatData = await connection.get("/api/manager/support-requests", {
      params: {
        user: companionUserId,
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