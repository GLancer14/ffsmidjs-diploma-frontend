// import { useContext, useEffect, useState, type ChangeEvent } from "react";
import { Check, CheckCheck, EllipsisVertical, Paperclip, Search, SendHorizonal, Smile } from "lucide-react";
import styles from "./Message.module.scss";
import classNames from "classnames";
import { parseDateFromUTCToRu, parseDateFromUTCToRuTime } from "../../../../utils/parseRuDate";
// import classNames from "classnames";
// import { ActionModalContext } from "../../../../context/ActionModalContext";
// import { AlertContext } from "../../../../context/AlertContext";
// import { createLibrary, updateLibrary } from "../../../../api/libraries";
// import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHook";
// import { updateLibraryInfo, updateObservedLibraryProfile } from "../../../../store/reducers/observedLibraryProfileSlice";

export interface MessageProps {
  authorName: string;
  content: string;
  // avatar: string;
  time: string;
  status: string | null;
  type: string;
}

export function Message({ authorName, content, time, status, type }: MessageProps) {
  // console.log(authorName)
  return (
    <div className={classNames(styles.message, {
      [styles.myMessage]: type === "my"
    })}>
      {/* {
        avatar && 
        <img className={styles.avatar} src={avatar} alt="аватар" />
      } */}
      <div className={styles.cloud}>
        <div className={styles.author}>{authorName}</div>
        <div className={styles.content}>{content}</div>
        <div className={styles.messageData}>
          <span className={styles.time}>{parseDateFromUTCToRuTime(time)}</span>
          {type !== "my" && 
              (
                status === "unread"
                  ? <Check size={18} className={styles.status} />
                  : <CheckCheck size={18} className={styles.status} />
              )
          }
        </div>
      </div>
    </div>
  );
}