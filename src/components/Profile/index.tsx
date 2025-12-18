import { Outlet } from "react-router";
import { Profile } from "./Profile/Profile";
import { SidePanel } from "./SidePanel/SidePanel";

export function ProfileLayout() {
  return (
    <main className="main">
      <Profile>
        <SidePanel />
        <Outlet />
      </Profile>
    </main>
  );
}