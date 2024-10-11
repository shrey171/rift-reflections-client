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
    <span className="inverted-border w-11/12 rounded-s-full h-full bg-frost right-0 top-0 -z-10 absolute" />
  );

export const SidebarLink = ({
  text,
  Icon,
  IconClasses,
  ActiveIconClasses,
  to,
}: ISidebarLinkProps) => {
  const isActive = window.location.pathname === to;
  const className = twMerge(
    "flex items-center gap-2 ps-12 py-3 relative z-0",
    isActive && "text-secondary nav-active"
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
      <p className="text-xl">{text}</p>
    </Link>
  );
};
