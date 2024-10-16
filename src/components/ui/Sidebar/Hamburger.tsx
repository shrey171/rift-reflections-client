import Lines from "assets/hamburger.svg";
import Close from "assets/close.svg";

interface IHamburger {
  IsOpenState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

export const Hamburger = ({ IsOpenState }: IHamburger) => {
  const [isOpen, setIsOpen] = IsOpenState;
  return isOpen ? (
    <Close
    // @ts-ignore
      onClick={() => setIsOpen(false)}
      className="h-8 w-min text-frost cursor-pointer lg:hidden"
    />
  ) : (
    <Lines
    // @ts-ignore
      onClick={() => setIsOpen(true)}
      className="h-8 w-min text-frost cursor-pointer lg:hidden"
    />
  );
};
