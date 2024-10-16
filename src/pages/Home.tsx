import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="flex flex-col gap-3 justify-center items-center h-full">
      <p className="text-2xl">Coming soon...</p>
      <Link to={"/death-notes"} className="underline text-blue-500 text-lg">
        Open Death Notes
      </Link>
    </div>
  );
};
