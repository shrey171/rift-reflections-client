import { NewNoteForm } from "components/ui";
import { useSpinner } from "hooks";
import { getSquareArt } from "lib/utils";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetDeathNotesQuery } from "store";
import { format } from "date-fns"

export const DeathNotes = () => {
  const { setIsLoading } = useSpinner();
  const { data: notes, isSuccess, isLoading } = useGetDeathNotesQuery();
  useEffect(() => setIsLoading(isLoading), [isLoading]);

  return (
    <div className="grid py-4 gap-4 w-full md:p-2 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      <NewNoteForm />
      {isSuccess &&
        notes.map((note: any) => {
          const color = note.win ? "green" : "red";
          return (
            <Link
              to={`/death-notes/${note._id}`}
              key={note._id}
              className={`flex gap-4 border px-4 sm:px-8 py-6 rounded-lg border-${color}-500 bg-${color}-200`}>
              <div className="basis-full">
                <p className="">
                  <span className="font-semibold">Deaths:</span> {note?.deaths}
                </p>
                <p className="">
                  <span className="font-semibold">Date:</span> {note?.date && format(new Date(note?.date), "dd-MMM")}
                </p>
              </div>
              <div className="flex justify-end items-center gap-3">
                <img
                  src={getSquareArt(note?.userChampion)}
                  className="w-12 rounded"
                  alt=""
                />
                <p className="uppercase text-xl">X</p>
                <img
                  src={getSquareArt(note?.enemyChampion)}
                  className="w-12 rounded"
                  alt=""
                />
              </div>
            </Link>
          );
        })}
    </div>
  );
};
