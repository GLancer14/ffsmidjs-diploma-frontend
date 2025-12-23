import { useContext, useEffect, useState, type ChangeEvent } from "react";
import styles from "./LibraryProfile.module.scss";
import { ActionModalContext } from "../../../context/ActionModalContext";
import { ArrowBigLeft, ChevronsLeft, ChevronsRight, Pencil, Trash2 } from "lucide-react";
import classNames from "classnames";
import { useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHook";
import { DeleteUser } from "../Actions/DeleteUser/DeleteUser";
import { getLibraryById } from "../../../api/libraries";
import { updateObservedLibraryProfile } from "../../../store/reducers/observedLibraryProfileSlice";
import Pagination from "@mui/material/Pagination";
import { EditLibrary } from "../Actions/EditLibrary/EditLibrary";
import { DeleteLibrary } from "../Actions/DeleteLibrary/DeleteLibrary";
import { AddBook } from "../Actions/AddBook/AddBook";

export function LibraryProfile() {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { showActionModal } = useContext(ActionModalContext);
  const observedLibraryProfile = useAppSelector(state => state.observedLibraryProfileReducer);
  const navigation = useNavigate();
  const [sortType, setSortType] = useState("all");
  const [page, setPage] = useState(1);
  const [pagesCount, setPagesCount] = useState(1);
  const limit = 10;

  const booksList = observedLibraryProfile.book.map(book => {
    return (
      <div className={styles.row} key={book.book.id}>
        <div className={classNames(styles.id, styles.cell)}>{book.book.id}</div>
        <div className={classNames(styles.title, styles.cell)}>{book.book.title}</div>
        <div className={classNames(styles.author, styles.cell)}>{book.book.author}</div>
        <div className={classNames(styles.year, styles.cell)}>{book.book.year}</div>
        <div className={classNames(styles.description, styles.cell)}>{book.book.description}</div>
        <div className={classNames(styles.copies, styles.cell)}>{book.totalCopies}</div>
        <div className={classNames(styles.actions, styles.cell)}>
          <button
            className={styles.action}
            type="button"
            onClick={() => {}}
          >
            <Pencil className={styles.pencil} />
          </button>
          <button
            className={styles.action}
            type="button"
            onClick={() => {}}
          >
            <Trash2 className={styles.trash} />
          </button>
        </div>
      </div>
    );
  });
                

  async function handleGetLibraryData() {
    if (params.id) {
      const library = await getLibraryById(params.id);

      dispatch(updateObservedLibraryProfile(library));
    }
  }

  async function handleGetPagesCount() {
    const booksCount = observedLibraryProfile.book.length;

    setPagesCount(Math.ceil(booksCount / limit));
  }

  function handlePageChange(e: React.ChangeEvent<unknown>, page: number) {
    setPage(page);
  }

  useEffect(() => {
    handleGetPagesCount();
    handleGetLibraryData();
  }, [observedLibraryProfile]);

  function handleRentTypeChange(e: ChangeEvent<HTMLInputElement>) {
    setSortType(e.currentTarget.value);
  }

  return (
    <div className={styles.libraryProfile}>
      <header className={styles.header}>
        <span className={styles.name}>{observedLibraryProfile.name}</span>
        <button
          className={styles.back}
          onClick={() => {
            navigation("/profile/libraries");
          }}
        >
          <ArrowBigLeft />
          Назад
        </button>
      </header>
      <div className={styles.card}>
        <header className={styles.cardHeader}>Информация</header>
        <div className={styles.dataWrp}>
          <div className={styles.desc}>Название:</div>
          <div className={styles.content}>{observedLibraryProfile.name}</div>
          <div className={styles.desc}>Адрес:</div>
          <div className={styles.content}>{observedLibraryProfile.address}</div>
          <div className={styles.desc}>Описание:</div>
          <div className={styles.content}>{observedLibraryProfile.description}</div>
          <div className={styles.desc}>Всего книг:</div>
          <div className={styles.content}>{observedLibraryProfile.totalCopies}</div><div className={styles.desc}>Доступно книг:</div>
          <div className={styles.content}>{observedLibraryProfile.availableCopies}</div>
        </div>
        <div className={styles.btnsWrp}>
          <button
            className={classNames(styles.btn, styles.edit)}
            type="button"
            onClick={() => {
              showActionModal!(
                <EditLibrary />
              );
            }}
          >
            Редактировать
          </button>
          <button
            className={classNames(styles.btn, styles.delete)}
            type="button"
            onClick={() => {
              showActionModal!(
                <DeleteLibrary />
              );
            }}
          >
            Удалить библиотеку
          </button>
        </div>
      </div>
      <div className={styles.books}>
        <form className={styles.booksForm}>
          <label className={styles.label}>
            <span className={styles.desc}>Все</span>
            <input
              className={styles.radio}
              type="radio"
              name="sort-type"
              value="all"
              onChange={handleRentTypeChange}
            />
          </label>
          <label className={styles.label}>
            <span className={styles.desc}>Автор</span>
            <input
              className={styles.radio}
              type="radio"
              name="sort-type"
              value="reserved"
              onChange={handleRentTypeChange}
            />
          </label>
          <label className={styles.label}>
            <span className={styles.desc}>Кол-во экземпляров</span>
            <input
              className={styles.radio}
              type="radio"
              name="sort-type"
              value="complete"
              onChange={handleRentTypeChange}
            />
          </label>
          <button
            className={styles.addBookBtn}
            type="button"
            onClick={() => {
              showActionModal!(<AddBook />);
            }}
          >
            Добавить книгу
          </button>
        </form>
        <div className={styles.table}>
          <div className={styles.headerRow}>
            <div className={classNames(styles.id, styles.cell)}>ID</div>
            <div className={classNames(styles.title, styles.cell)}>Название</div>
            <div className={classNames(styles.author, styles.cell)}>Автор</div>
            <div className={classNames(styles.year, styles.cell)}>Год</div>
            <div className={classNames(styles.description, styles.cell)}>Описание</div>
            <div className={classNames(styles.copies, styles.cell)}>Кол-во экземпляров</div>
            <div className={classNames(styles.actions, styles.cell)}>Действие</div>
          </div>
          {
            booksList.length === 0
              ? (<div className={styles.noResults}>Записи отсутствуют</div>)
              : booksList
          }
        </div>
        {
          pagesCount > 0 &&
          <div className={styles.pagination}>
            <button className={styles.navBtn} onClick={() => {
              if (page > 1) {
                setPage(prev => prev - 1);
              }
            }}>
              <ChevronsLeft />
            </button>
            <Pagination
              count={pagesCount}
              page={page}
              onChange={handlePageChange}
              hideNextButton
              hidePrevButton
              defaultPage={1}
              siblingCount={0}
              boundaryCount={1}
              sx={{
                "& .Mui-selected": {
                  backgroundColor: "rgb(255, 195, 62)",
                  border: "1px solid rgb(0, 0, 0)",
                },
                "& .Mui-selected:hover": {
                  backgroundColor: "rgb(255, 195, 62)",
                  border: "1px solid rgb(0, 0, 0)",
                },
                "& .MuiPaginationItem-root": {
                  width: "36px",
                  height: "36px",
                  margin: "0 -2px",
                  font: "inherit",
                },
                "& .MuiPaginationItem-icon": {
                  width: "36px",
                  height: "36px",
                },
                "& .MuiPaginationItem-icon:hover": {
                  boxShadow: "none",
                },
                 "& .MuiPaginationItem-ellipsis": {
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  verticalAlign: "bottom"
                },
              }}
            />
            <button className={styles.navBtn} onClick={() => {
              if (page < pagesCount) {
                setPage(prev => prev + 1);
              }
            }}>
              <ChevronsRight />
            </button>
          </div>
        }
      </div>
    </div>
  );
}