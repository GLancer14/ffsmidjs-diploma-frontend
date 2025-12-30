import { useContext, useEffect, useState } from "react";
import styles from "./ManagerBooks.module.scss";
import { ChevronUp } from "lucide-react";
import classNames from "classnames";
import { useAppDispatch } from "../../../hooks/reduxHook";
import { getLibraries, type LibrariesSearchResponseDto } from "../../../api/libraries";
import { updateLibraryInfo } from "../../../store/reducers/observedLibraryProfileSlice";
import { LibraryProfileCard } from "../LibraryProfileCard/LibraryProfileCard";
import { AlertContext } from "../../../context/AlertContext";

export function ManagerBooks() {
  const dispatch = useAppDispatch();
  const { showAlert } = useContext(AlertContext);
  const [librariesVisibility, setLibrariesVisibility] = useState(false);
  const [selectedLibraryName, setSelectedLibraryName] = useState("Выберите библиотеку");
  const [selectedLibrary, setSelectedLibrary] = useState<LibrariesSearchResponseDto | null>(null);
  const [libraries, setLibraries] = useState<LibrariesSearchResponseDto[]>([]);
  

  async function handleGetLibrariesData() {
    const libraries = await getLibraries({ searchString: "" });
    if (libraries?.status === "fail") {
      showAlert!(libraries.data);
      return;
    }
    
    setLibraries(libraries);
  }

  useEffect(() => {
    handleGetLibrariesData();
  }, []);

  return (
    <div className={styles.books}>
      <header className={styles.header}>
        Книги
      </header>
      <p className={styles.selectDesc}>Выберите одну из библиотек из списка. Книга будет добавлена именно в выбранную библиотеку.</p>
      <div className={styles.selectWrp}>
        <button
          className={styles.select}
          type="button"
          value={selectedLibraryName}
          onClick={() => setLibrariesVisibility(!librariesVisibility)}
        >
          {selectedLibraryName}
          <ChevronUp className={classNames(styles.arrow, {
            [styles.rotatedArrow]: !librariesVisibility,
          })} />
        </button>
        <ul className={classNames(styles.libraries, {
          [styles.visibleLibraries]: librariesVisibility
        })}>
          {libraries.map((library, index) => {
            return (
              <li
                className={styles.libraryItem}
                key={library.id}
                onClick={() => {
                  setSelectedLibraryName(library.name);
                  dispatch(updateLibraryInfo(library))
                  setSelectedLibrary(library);
                  setLibrariesVisibility(false);
                }}
              >
                <div className={styles.number}>{index + 1}</div>
                {library.name}
              </li>
            );
          })}
        </ul>
      </div>
      {
        selectedLibraryName !== "Выберите библиотеку" && 
        <LibraryProfileCard
          name={selectedLibrary?.name}
          address={selectedLibrary?.address}
          description={selectedLibrary?.description}
          totalCopies={selectedLibrary?.totalCopies}
          availableCopies={selectedLibrary?.availableCopies}
        />
      }
    </div>
  );
}