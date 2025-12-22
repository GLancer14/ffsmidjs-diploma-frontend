import { useContext, useEffect, useRef, useState, type ChangeEvent } from "react";
import styles from "./Libraries.module.scss";
import { findUsers, getUsersCount } from "../../../api/users";
import { AddUser } from "../Actions/AddUser/AddUser";
import { ActionModalContext } from "../../../context/ActionModalContext";
import { BookOpen, ChevronsLeft, ChevronsRight, ContactRound, MessageSquare, UserRound } from "lucide-react";
import Pagination from "@mui/material/Pagination";
import type { User } from "../../../types/users";
import classNames from "classnames";
import { Link } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHook";
import { findUserBookRents } from "../../../api/bookRent";
import { updateUsersRents, type BookRentalResponseDto } from "../../../store/reducers/usersRentsSlice";
import { updateFoundUsers } from "../../../store/reducers/foundUsers";
import { getLibraries, getLibrariesCount, type LibrariesSearchResponseDto } from "../../../api/libraries";
import { AddLibrary } from "../Actions/AddLibrary/AddLibrary";

export function Libraries() {
  const [libraries, setLibraries] = useState<LibrariesSearchResponseDto[]>([]);
  const [foundUsers, setFoundUserRents] = useState<User[]>([]);
  const { showActionModal } = useContext(ActionModalContext);
  const [userType, setUserType] = useState("");
  const [searchString, setSearchString] = useState("");
  const [page, setPage] = useState(1);
  const [pagesCount, setPagesCount] = useState(1);
  const limit = 10;

  async function handleSearchLibraries() {
    const librariesFromApi: LibrariesSearchResponseDto[] = await getLibraries({
      limit: limit,
      offset: limit * (page - 1),
      searchString,
    });

    if (librariesFromApi) {
      setLibraries(librariesFromApi);
    }
  }

  async function handleGetPagesCount() {
    const usersCount = await getLibrariesCount({searchString});

    setPagesCount(Math.ceil(usersCount / limit));
  }

  function handlePageChange(e: React.ChangeEvent<unknown>, page: number) {
    setPage(page);
  }

  useEffect(() => {
    handleGetPagesCount();
  }, [searchString]);

  useEffect(() => {
    handleSearchLibraries();
  }, [searchString, page]);

  return (
    <div className={styles.libraries}>
      <header className={styles.header}>
        <span>Библиотеки</span>
        <button
          className={styles.addLibraryBtn}
          onClick={() => {
            showActionModal!(<AddLibrary />);
          }}
        >
          Добавить библиотеку
        </button>
      </header>
      <form className={styles.form}>
        <input
          className={styles.search}
          type="text"
          value={searchString}
          onInput={(e) => {
            setSearchString(e.currentTarget.value);
          }}
          placeholder="Введите название библиотеки или её адрес"
        />
      </form>
      <div className={styles.searchResults}>
        <div className={styles.headerRow}>
          <div className={classNames(styles.id, styles.cell)}>ID</div>
          <div className={classNames(styles.name, styles.cell)}>Название библиотеки</div>
          <div className={classNames(styles.address, styles.cell)}>Адрес</div>
          <div className={classNames(styles.total, styles.cell)}>Всего книг</div>
          <div className={classNames(styles.available, styles.cell)}>Доступно</div>
        </div>
        {
          libraries.length === 0
            ? (<div className={styles.noResults}>Результаты не найдены</div>)
            : libraries.map(library => {
              return (
                <Link className={styles.row} to={`/profile/libraries/${library.id}`} key={library.id}>
                  <div className={classNames(styles.id, styles.cell)}>{library.id}</div>
                  <div className={classNames(styles.name, styles.cell)}>
                    {library.name}
                  </div>
                  <div className={classNames(styles.address, styles.cell)}>{library.address}</div>
                  <div className={classNames(styles.total, styles.cell)}>{library.totalCopies}</div>
                  <div className={classNames(styles.available, styles.cell)}>{library.availableCopies}</div>
                  
                </Link>);
              })
        }
      </div>
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
    </div>
  );
}