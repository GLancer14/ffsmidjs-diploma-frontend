import { createContext, useEffect, useRef } from "react";
import { io, type Socket } from "socket.io-client";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { addMessage } from "../store/reducers/observedUserProfileSlice";

export interface SocketContextInterface {
  socket?: Socket;
}

export interface SocketStateProps {
  children: React.ReactNode;
}

export const SocketContext = createContext<SocketContextInterface>({});

export function SocketState({ children }: SocketStateProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.userReducer);
  const socketRef = useRef<Socket | null>(null)

  function handleSocketCreate(userId: number) {
    const socket = io(
      import.meta.env.VITE_SERVER_URL || "http://localhost:3000", {
        withCredentials: true,
        transports: ["websocket", "polling"],
        query: {
          userId
        },
    });

    socket.on("connect", () => {
      console.log("Socket connected: ", socket.id);
    });

    socket.on("disconnect", (reason) => {
      console.log("Socket disconnected: ", reason);
    });

    return socket;
  }
    
  useEffect(() => {
    let socket: Socket;
    if (user.id !== 0) {
      socket = handleSocketCreate(user.id);
      socketRef.current = socket;
      socket.connect();

      socket.on("newMessage", (payload) => {
        dispatch(addMessage(payload.message));
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [user.email]);

  return (
    <SocketContext.Provider value={{ socket: socketRef.current || undefined }}>
      {children}
    </SocketContext.Provider>
  );
};