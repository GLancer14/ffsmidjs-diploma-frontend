import { createContext, useEffect, useRef, useState } from "react";
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
    const [isConnected, setIsConnected] = useState(false);
    const user = useAppSelector(state => state.userReducer);
    const [socketId, setSocketId] = useState<string | undefined>("");
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
        setIsConnected(true);
      });

      socket.on("disconnect", (reason) => {
        console.log("Socket disconnected: ", reason);
        setIsConnected(false);
      });

      return socket;
    }
    
    useEffect(() => {
      let socket: Socket;
      if (user.email !== "") {
        socket = handleSocketCreate(user.id);
        socketRef.current = socket;
        socket.connect();
        setSocketId(socket.id)

        socket.on("newMessage", (payload) => {
          dispatch(addMessage(payload.message));
          console.log("newMessage", payload);
        })

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