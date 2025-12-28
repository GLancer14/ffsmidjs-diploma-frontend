import { useAppSelector } from "../../hooks/reduxHook";
import { FindBook } from "./FindBook/FindBook";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { BooksNotFound } from "./BooksNotFound/BooksNotFound";
import { SearchResults } from "./SearchResults/SearchResults";

export function FindBookLayout() {
   const searchedBooks = useAppSelector(state => state.booksSearchReducer);

  return (
    <>
      <Header />
      <main className="main">
        <FindBook />
        {searchedBooks.length > 0 ? <SearchResults /> : <BooksNotFound />}
      </main>
      <Footer />
    </>
  );
}