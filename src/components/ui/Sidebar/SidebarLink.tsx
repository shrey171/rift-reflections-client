import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

interface ISidebarLinkProps {
  text: string;
  to: string;
  Icon: any;
  IconClasses?: string;
  ActiveIconClasses?: string;
}

const ActiveIndicator = ({ isActive }: { isActive: boolean }) =>
  isActive && (
    <span className="w-full hidden absolute h-full right-0 top-0 transition-all duration-300 inverted-border lg:block" />
  );

export const SidebarLink = ({
  text,
  Icon,
  IconClasses,
  ActiveIconClasses,
  to,
}: ISidebarLinkProps) => {
  const path = window.location.pathname;
  const isActive = path === to || path.split("/")[1] === to.split("/")[1];
  const className = twMerge(
    "flex items-center gap-2 px-6 py-2 lg:py-3 bg-opacity-0 relative z-0 lg:ms-8 lg:rounded-e-none",
    isActive && "text-secondary nav-active bg-opacity-100 bg-frost rounded-full"
  );

  return (
    <Link className={className} to={to}>
      <ActiveIndicator isActive={isActive} />
      <Icon
        className={twMerge(
          "h-6 w-min",
          IconClasses,
          isActive && ActiveIconClasses
        )}
      />
      <p className="lg:text-xl">{text}</p>
    </Link>
  );
};
