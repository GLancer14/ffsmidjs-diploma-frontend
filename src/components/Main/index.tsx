import { FindBook } from "../FindBook/FindBook";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { EditorsChoice } from "./EditorsChoice/EditorsChoice";

export function MainLayout() {
  return (
    <>
      <Header />
      <main className="main">
        <FindBook />
        <EditorsChoice />
      </main>
      <Footer />
    </>
    
  );
}