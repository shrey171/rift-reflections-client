import { useParams } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";
import { Checkbox, Dropdown } from "components/ui";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useWatch } from "react-hook-form";
import { getSquareArt } from "lib/utils";
import { useSpinner } from "hooks";
import { useEffect, useRef } from "react";
import { useEditNotesMutation, useGetDeathNotesQuery } from "store";
import { format } from "date-fns";

const list = [
  { label: "Macro", value: "macro" },
  { label: "Micro", value: "micro" },
  { label: "Other", value: "other" },
];
const NoteSchema = z.array(
  z.object({
    content: z.string().optional(),
    cause: z.string(),
    worth: z.boolean(),
  })
);
const DeathNoteSchema = z.object({ notes: NoteSchema });
export type TDeathNote = z.infer<typeof DeathNoteSchema>;

export const DeathNote = () => {
  const { id } = useParams();
  const { setIsLoading } = useSpinner();
  const { data: notes, isSuccess, isLoading } = useGetDeathNotesQuery();
  const current = notes?.find((note: any) => note._id === id);
  const {
    control,
    handleSubmit,
    setValue,
  } = useForm<TDeathNote>({
    resolver: zodResolver(DeathNoteSchema),
  });
  const [mutation] = useEditNotesMutation();
  const watch = useWatch({ control });
  const initialized = useRef(false);

  const submit = () => {
    if (!initialized.current) {
      initialized.current = true;
      return; 
    }
    console.log("SUBMITTED");
    handleSubmit((data) => mutation({id: current?._id, ...data}))();
  };

  useEffect(() => {
    let timeout = setTimeout(submit, 1000);
    return () => clearTimeout(timeout);
  }, [watch]);
  useEffect(() => setValue("notes", current?.notes), [isSuccess]);
  useEffect(() => setIsLoading(isLoading), [isLoading]);

  return (
    isSuccess && (
      <div className="flex flex-col items-center">
        <div className="text-center">
          <p className="text-xl font-semibold">
            {current?.date && format(new Date(current?.date), "do MMMM, yyyy")}
          </p>
          <p className="text-lg font-medium">
            {current?.win ? (
              <span className="text-green-600">Victory</span>
            ) : (
              <span className="text-red-600">Defeat</span>
            )}
          </p>
        </div>

        <div className="flex items-center gap-8 mt-8">
          <img
            src={getSquareArt(current?.userChampion)}
            alt=""
            className="w-20 rounded"
          />
          <p className="uppercase font-semibold text-2xl">X</p>
          <img
            src={getSquareArt(current?.enemyChampion)}
            alt=""
            className="w-20 rounded"
          />
        </div>

        <form
          className="grid md:place-items-center gap-16 w-full my-20 xl:px-12">
          {current?.notes.map((_: any, idx: number) => (
            <div className="flex w-11/12" key={idx}>
              <p className="px-4 flex py-2 h-full">{idx + 1}</p>
              <div className="w-full grid gap-1">
                <div className="flex gap-6">
                  <div className="w-full max-w-56">
                    <Controller
                      control={control}
                      name={`notes.${idx}.cause`}
                      render={({ field }: any) => (
                        <Dropdown
                          text={field.value || "Mistake type"}
                          value={field.value}
                          list={list}
                          onSelect={value => field.onChange(value)}
                        />
                      )}
                    />
                  </div>
                  <div className="flex gap-2 items-center">
                    worth?
                    <Controller
                      control={control}
                      name={`notes.${idx}.worth`}
                      render={({ field }: any) => (
                        <Checkbox
                          className="flex"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                </div>
                <Controller
                  control={control}
                  name={`notes.${idx}.content`}
                  render={({ field }: any) => (
                    <TextareaAutosize
                      name={`notes.${idx}.content`}
                      onChange={field.onChange}
                      placeholder={`Death ${idx + 1}`}
                      value={field.value}
                      draggable={false}
                      className="w-full resize-none p-4 border border-gray-300 rounded-lg"
                    />
                  )}
                />
              </div>
            </div>
          ))}
        </form>
      </div>
    )
  );
};
