import styles from "./Profile.module.scss";
import { useEffect, useRef, useState } from "react";
import { getNewIncomings } from "../../../api/libraries";
import { BookCard } from "../../BookCard/BookCard";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import type { Book } from "../../../types/library";


export function Profile({children}: {children: React.ReactNode}) {
  return (
    <div className={styles.wrp}>
      {children}
    </div>
  );
}