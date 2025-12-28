import { Outlet, useNavigate } from "react-router";
import { Profile } from "./Profile/Profile";
import { SidePanel } from "./SidePanel/SidePanel";
import { useAppSelector } from "../../hooks/reduxHook";
import { useEffect } from "react";

export function ProfileLayout() {
  const navigation = useNavigate();
  const user = useAppSelector(state => state.userReducer);

  useEffect(() => {
    if (user.role === "") {
      navigation("/");
    }
  }, []);
  
  return (
    <main className="main">
      <Profile>
        <SidePanel />
        <Outlet />
      </Profile>
    </main>
  );
}