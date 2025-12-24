// import { useContext, useEffect, useState, type ChangeEvent } from "react";
import { EllipsisVertical, Paperclip, Search, SendHorizonal, Smile } from "lucide-react";
import styles from "./Chat.module.scss";
import { addMessage, type Chat } from "../../../store/reducers/observedUserProfileSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHook";
import { Message } from "./Message/Message";
import { useState } from "react";
import { sendMessage } from "../../../api/supportChat";

export function Chat({ chat }: { chat: Chat }) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.userReducer);
  const observedUserProfile = useAppSelector(state => state.observedUserProfileReducer);
  const [message, setMessage] = useState("");

  async function handleSendMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const sendedMessage = await sendMessage(observedUserProfile.chat.id, message);

    console.log(sendedMessage);
    if (!sendedMessage.status) {
      dispatch(addMessage({
        id: sendedMessage.id,
        author: sendedMessage.author,
        sentAt: sendedMessage.sentAt,
        text: sendedMessage.textAt,
        readAt: sendedMessage.readAt,
        supportRequestId: sendedMessage.supportRequestId,
      }));

      setMessage("");
    }
  }

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
          chat.messages.length === 1 && chat.id === 0
            ? "Здесь пока нет сообщений"
            : chat.messages.map(message => {
              message.author
              return (
                <Message
                  authorName={message.author}
                  content={message.text}
                  time={message.sentAt}
                  status={message.readAt}
                  type={
                    message.author === user.name ? "my" : "another"
                  }
                />
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