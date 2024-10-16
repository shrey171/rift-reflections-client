import { SidebarLink } from "./SidebarLink";
import DeathNotes from "assets/skull.svg";
import Home from "assets/home.svg";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { Hamburger } from "./Hamburger";

export const Sidebar = () => {
  const isOpenState = useState(false);

  return (
    <nav className="w-full lg:max-w-xs">
      <div className="flex justify-between items-center gap-6 p-4">
        <p className="text-3xl text-center lg:w-full">Rift Reflections</p>
        <Hamburger IsOpenState={isOpenState} />
      </div>
      <div className={twMerge("flex flex-col gap-2 my-4 overflow-clip transition-all duration-300 relative sm:flex-row md:max-h-full lg:flex-col lg:my-12 lg:overflow-visible", !isOpenState[0] && "max-h-0")}>
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
