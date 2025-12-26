// import { useContext, useEffect, useState, type ChangeEvent } from "react";
import { EllipsisVertical, Paperclip, Search, SendHorizonal, Smile } from "lucide-react";
import styles from "./Chat.module.scss";
import { addMessage, type Chat } from "../../../store/reducers/observedUserProfileSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHook";
import { Message } from "./Message/Message";
import { useEffect, useRef, useState } from "react";
import { markMessagesAsRead, sendMessage } from "../../../api/supportChat";
import { parseDateFromUTCToRu } from "../../../utils/parseRuDate";
import { useInView } from "react-intersection-observer";

// export function Chat({ chat }: { chat: Chat }) {
export function Chat() {
  
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.userReducer);
  const observedUserProfile = useAppSelector(state => state.observedUserProfileReducer);
  const [message, setMessage] = useState("");
  const messagesRef = useRef<HTMLDivElement>(null);

  async function handleSendMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const sendedMessage = await sendMessage(observedUserProfile.chat.id, message);

    console.log(sendedMessage);
    if (!sendedMessage.status) {
      // dispatch(addMessage({
      //   id: sendedMessage.id,
      //   author: sendedMessage.author,
      //   sentAt: sendedMessage.sentAt,
      //   text: sendedMessage.textAt,
      //   readAt: sendedMessage.readAt,
      //   supportRequestId: sendedMessage.supportRequestId,
      // }));

      setMessage("");
    }
  }

  async function handleReadingMessages(supportRequestId: number, sentAt: string) {
    await markMessagesAsRead(supportRequestId, sentAt);
  }

  // useEffect(() => {
  //   if (messagesRef.current) {
  //     messagesRef.current.scrollTop = messagesRef.current.scrollHeight
  //   }
  // }, [observedUserProfile.chat.messages.length])

  // useEffect(() => {
  //   if (messagesRef.current) {
  //     messagesRef.current.scrollTop = messagesRef.current.scrollHeight
  //   }
  // }, []);

  return (
    <div className={styles.chat}>
      <header className={styles.header}>
        <span className={styles.logo}>logo</span>
        <span>Техподдержка</span>
        <div className={styles.btnsWrp}>
          <button className={styles.btn}>
            <Search />
          </button>
          <button className={styles.btn}>
            <EllipsisVertical />
          </button>
        </div>
      </header>
      <div className={styles.messages}>
        {
          observedUserProfile.chat.messages.length === 1 && observedUserProfile.chat.id === 0
            ? "Здесь пока нет сообщений"
            : observedUserProfile.chat.messages.map((message, index, array) => {
              let dateCloud = null;
              const prevMessageSendingDay = (new Date(array[index - 1]?.sentAt)).getDate();
              const currMessageSendingDay = (new Date(message.sentAt)).getDate();
              if (prevMessageSendingDay !== currMessageSendingDay) {
                dateCloud = <div className={styles.dateCloud}>{parseDateFromUTCToRu(message.sentAt)}</div>
              }

              return (
                <>
                  {dateCloud}
                  <Message
                    onMessageInView={() => handleReadingMessages(message.supportRequestId, message.sentAt)}
                    key={message.id}
                    authorName={message.users.name}
                    content={message.text}
                    time={message.sentAt}
                    status={message.readAt}
                    type={
                      message.author === user.id ? "my" : "another"
                    }
                  />
                </>
              );
            })
        }
      </div>
      <form className={styles.footer} onSubmit={handleSendMessage}>
        <label className={styles.attachFile}>
          <Paperclip />
          <input
            className={styles.inputFile}
            type="file"
            name="chat_file"
          />
        </label>
        <input
          className={styles.messageInput}
          type="text"
          name="chat_message"
          placeholder="Сообщение..."
          value={message}
          onInput={(e) => setMessage(e.currentTarget.value)}
        />
        <button
          className={styles.btn}
          type="button"
          onClick={() => {}}
        >
          <Smile />
        </button>
        <button
          className={styles.btn}
        >
          <SendHorizonal className={styles.send} />
        </button>
      </form>
    </div>
  );
}