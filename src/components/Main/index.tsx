import { FindBook } from "../FindBook/FindBook";
import { Header } from "../Header/Header";
import { EditorsChoice } from "./EditorsChoice/EditorsChoice";

export function MainLayout() {
  return (
    <>
      <Header />
      <FindBook />
      <EditorsChoice />
    </>
  );
}