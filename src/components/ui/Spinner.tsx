import { useSpinner } from "hooks";
import { SyncLoader } from "react-spinners";

export const Spinner = () => {
  const { isLoading } = useSpinner();
  return (
    isLoading && (
      <div className="absolute left-0 top-0 w-full h-full flex justify-center items-center bg-secondary bg-opacity-80 z-100">
        <SyncLoader color="#f1f5f9" />
      </div>
    )
  );
};
