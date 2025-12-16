import { useAppSelector } from "../../hooks/reduxHook";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { BookRent } from "./BookRent/BookRent";


export function BookRentLayout() {
  return (
    <>
      <Header />
      <main className="main">
        <BookRent />
      </main>
      <Footer />
    </>
    
  );
}