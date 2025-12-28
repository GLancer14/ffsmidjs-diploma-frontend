import { Outlet, useNavigate } from "react-router";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { useAppSelector } from "../../hooks/reduxHook";
import { useEffect } from "react";

export function BookRentLayout() {
  const navigation = useNavigate();
  const user = useAppSelector(state => state.userReducer);

  useEffect(() => {
    if (user.role === "") {
      navigation("/");
    }
  }, []);

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