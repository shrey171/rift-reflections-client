import { SidebarLink } from "./SidebarLink";
import DeathNotes from "assets/skull.svg";
import Home from "assets/home.svg";

export const Sidebar = () => {
  return (
    <nav className="w-full max-w-xs">
      <p className="text-3xl text-center">Rift Reflections</p>
      <div className="flex flex-col gap-2 mt-12 relative">
        <SidebarLink
          to="/"
          text="Home"
          Icon={Home}
          IconClasses="stroke-current"
          ActiveIconClasses="fill-frost"
        />
        <SidebarLink
          to="/death-notes"
          Icon={DeathNotes}
          IconClasses="fill-current"
          text="Death Notes"
        />
      </div>
    </nav>
  );
};
