import { Check, CheckCheck } from "lucide-react";
import styles from "./Message.module.scss";
import classNames from "classnames";
import { parseDateFromUTCToRuTime } from "../../../../utils/parseRuDate";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export interface MessageProps {
  authorName: string;
  content: string;
  time: string;
  status: string | null;
  type: string;
  onMessageInView?: () => void;
}

export function Message({
  authorName,
  content,
  time,
  status,
  type,
  onMessageInView
}: MessageProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    delay: 1000,
  });

  useEffect(() => {
    if (inView && onMessageInView) {
      const timer = setTimeout(() => {
        onMessageInView();
      }, 1300);
      

      return () => {
        clearTimeout(timer);
      }
    }
  }, [inView, onMessageInView]);

  return (
    <div className={classNames(styles.message, {
        [styles.myMessage]: type === "my"
      })}
      ref={ref}
    >
      {/* {
        avatar && 
        <img className={styles.avatar} src={avatar} alt="аватар" />
      } */}
      <div className={styles.cloud}>
        <div className={styles.author}>{authorName}</div>
        <div className={styles.content}>{content}</div>
        <div className={styles.messageData}>
          <span className={styles.time}>{parseDateFromUTCToRuTime(time)}</span>
          {
            type === "my" && 
              (
                status === null
                  ? <Check size={18} className={styles.status} />
                  : <CheckCheck size={18} className={styles.status} />
              )
          }
        </div>
      </div>
    </div>
  );
}