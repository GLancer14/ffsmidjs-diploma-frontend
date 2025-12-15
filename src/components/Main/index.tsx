import { FindBook } from "../FindBook/FindBook";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { LibrariesOnMap } from "../LibrariesOnMap/LibrariesOnMap";
import { AboutUs } from "./AboutUs/AboutUs";
import { EditorsChoice } from "./EditorsChoice/EditorsChoice";
import { NewIncomings } from "./NewIncomings/NewIncomings";

export function MainLayout() {
  return (
    <>
      <Header />
      <main className="main">
        <FindBook />
        <EditorsChoice />
        <AboutUs />
        <NewIncomings />
        <LibrariesOnMap />
      </main>
      <Footer />
    </>
    
  );
}