import { Outlet } from "react-router";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";

export function BookRentLayout() {
  return (
    <>
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}