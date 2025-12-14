import { Link } from "react-router";
import styles from "./EditorsChoice.module.scss";
import { useEffect, useState } from "react";
import { getEditorsChoiceBooks } from "../../../api/books";
import { BookCard } from "../../BookCard/BookCard";

export interface Book {
  title: string;
  description?: string;
  libraryId: number;
  author: string;
  year?: number;
  totalCopies: number;
  id: number;
  coverImage?: string;
  isAvailable: boolean;
  availableCopies: number;
}

export function EditorsChoice() {
  const [books, setBooks] = useState<Book[]>([]);

  async function AboutUs() {
  return (
    <div className={styles.wrp}>
      
    </div>
  );
}