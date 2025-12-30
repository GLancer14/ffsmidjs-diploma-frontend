import {
  useContext,
  useRef,
  useState,
} from "react";
import styles from "./AddBook.module.scss";
import classNames from "classnames";
import { ActionModalContext } from "../../../../context/ActionModalContext";
import { AlertContext } from "../../../../context/AlertContext";
import {
  Minus,
  Paperclip,
  Plus,
  X,
} from "lucide-react";
import { fileToDataUrl } from "../../../../utils/fileToDataUrl";
import { addBook } from "../../../../api/libraries";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHook";
import { addBookToLibrary } from "../../../../store/reducers/observedLibraryProfileSlice";

export function AddBook() {
  const dispatch = useAppDispatch();
  const { showAlert } = useContext(AlertContext);
  const { closeActionModal } = useContext(ActionModalContext);
  const observedLibraryProfile = useAppSelector(state => state.observedLibraryProfileReducer);
  const formRef = useRef(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [copies, setCopies] = useState("1");
  const [cover, setCover] = useState<string | null>(null);
  const coverFileInput = useRef<HTMLInputElement>(null);

  async function handleCoverSelect (e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files !== null) {
      const files = [...e.target.files];
      const urls = await Promise.all(files.map(o => fileToDataUrl(o)));
      setCover(urls[0]);
    }
  }

  function handleCoverDelete() {
    if (coverFileInput.current) {
      coverFileInput.current.value = "";
    }

    setCover(null);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (formRef.current) {
      const formForSending = new FormData(formRef.current);
      formForSending.append("availableCopies", copies);
      formForSending.append("libraryId", String(observedLibraryProfile.id));
      const addedBook = await addBook(formForSending);

      if (addedBook?.status === "fail") {
        showAlert!(addedBook.data);
        return;
      }

      showAlert!("Книга успешно добавлена!", "success");
      closeActionModal!();

      dispatch(addBookToLibrary({
        totalCopies: +copies,
        availableCopies: +copies,
        book: {
          id: addedBook.id,
          title: title,
          author: author,
          description: description,
          year: +year,
          coverImage: addedBook.coverImage,
        },
      }));
      
      setTitle("");
      setAuthor("");
      setDescription("");
      setYear("");
      setCopies("1");
      setCover(null);
    }
  }

  return (
    <div className={styles.addBook}>
      <header className={styles.header}>
        Добавить книгу
      </header>
      <form className={styles.form} ref={formRef} onSubmit={handleSubmit}>
        <label className={styles.labelTitle}>
          <span className={styles.desc}>Название</span>
          <input
            className={styles.inputText}
            type="text"
            value={title}
            name="title"
            placeholder="Например, Братья Карамазовы"
            onInput={(e) => setTitle(e.currentTarget.value)}
          />
        </label>
        <label className={styles.labelAuthor}>
          <span className={styles.desc}>Автор</span>
          <input
            className={styles.inputText}
            type="text"
            value={author}
            name="author"
            placeholder="Например, Достоевский Ф.М."
            onInput={(e) => setAuthor(e.currentTarget.value)}
          />
        </label>
        <label className={styles.labelYear}>
          <span className={styles.desc}>Год издания</span>
          <input
            className={styles.inputText}
            type="text"
            value={year}
            name="year"
            placeholder="Например, 1998"
            onInput={(e) => setYear(e.currentTarget.value)}
          />
        </label>
        <label className={styles.labelDescription}>
          <span className={styles.desc}>Описание</span>
          <textarea
            className={classNames(styles.inputText, styles.textarea)}
            value={description}
            placeholder="Добавьте описание"
            name="description"
            onInput={(e) => setDescription(e.currentTarget.value)}
          ></textarea>
        </label>
        <div className={styles.copies}>
          <label
            className={styles.labelCopies}
            htmlFor="copies-amount_input"
          >
            Кол-во экземпляров
          </label>
          <div className={styles.amountWrp}>
            <button 
              className={styles.changeBtn}
              type="button"
              onClick={() => {
                if (+copies > 1) {
                  setCopies(prev => String(+prev - 1));
                }
              }}
            >
              <Minus />
            </button>
            <input
              className={styles.amount}
              id="copies-amount_input"
              type="text"
              part="div"
              maxLength={3}
              name="totalCopies"
              value={copies}
              onInput={(e) => setCopies(e.currentTarget.value)}
            />
            <button 
              className={styles.changeBtn}
              type="button"
              onClick={() => setCopies(prev => String(+prev + 1))}
            >
              <Plus />
            </button>
          </div>
        </div>
        <div className={styles.coverWrp}>
          {cover && 
            <img className={styles.cover} src={cover} alt="обложка" />
          }
          <div className={styles.coverActions}>
            {cover
              ? (<div className={styles.fileActionWrp}>
                  <label
                    className={styles.btn}
                    htmlFor="options_cover-file-input"
                  >
                    <Paperclip className={styles.icon} />
                    Изменить обложку
                  </label>
                  <button
                    className={styles.btn}
                    type="button"
                    onClick={handleCoverDelete}
                  >
                    <X className={styles.icon} />
                    Удалить обложку
                  </button>
                </div>)
              : (<div className={styles.fileActionWrp}>
                  <label
                    className={styles.btn}
                    htmlFor="options_cover-file-input"
                  >
                    <Paperclip className={styles.icon} />
                    Загрузить обложку
                  </label>
                </div>)
            }
            <input
              className={styles.fileInput}
              id="options_cover-file-input"
              name="coverImage"
              accept="image/jpg, image/jpeg"
              ref={coverFileInput}
              onChange={handleCoverSelect}
              type="file"
            />
          </div>
        </div>
        <div className={styles.btnsWrp}>
          <button
            className={classNames(styles.btn, styles.cancel)}
            type="button"
            onClick={() => closeActionModal!()}
          >
            Отменить
          </button>
          <button
            className={classNames(styles.btn, styles.submit)}
          >
            Добавить книгу
          </button>
        </div>
      </form>
    </div>
  );
}