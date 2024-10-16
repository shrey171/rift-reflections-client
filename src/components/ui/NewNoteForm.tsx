import {
  Button,
  Checkbox,
  DatePicker,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Dropdown,
  Input,
} from "components/ui";
import Plus from "assets/plus.svg";
import { useGetChampionsQuery, useNewDeathNoteMutation } from "store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { NewNoteFormField } from "./NewNoteFormField";
import { useSpinner } from "hooks";
import { useState } from "react";

const NewNoteSchema = z.object({
  userChampion: z.string().min(1, { message: "Your Champion Required" }),
  enemyChampion: z.string().min(1, { message: "Enemy Champion Required" }),
  date: z.date().refine((d) => d <= new Date(), { message: "What are you, a prophet? Why select future dates?" }),
  win: z.boolean(),
  deaths: z
    .number({ message: "Deaths required" })
    .max(20, { message: "Did you join a death race instead of a match? Max is 20" })
    .nonnegative({ message: "Must be 0 or more" }),
});

type TNewNoteSchema = z.infer<typeof NewNoteSchema>;

export function NewNoteForm() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: champions, isSuccess } = useGetChampionsQuery();
  const [mutation] = useNewDeathNoteMutation();
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(NewNoteSchema),
    defaultValues: {
      deaths: 0,
      win: false,
      date: new Date(),
      userChampion: "",
      enemyChampion: "",
    },
  });
  const { asyncWrapper } = useSpinner();

  const onSubmit = asyncWrapper(async (data: TNewNoteSchema) => {
    await mutation(data);
    reset();
    setIsOpen(false);
  });

  return (
    isSuccess && (
      <Dialog
        onOpenChange={crnt => {
          reset();
          setIsOpen(crnt);
        }}
        open={isOpen}>
        <DialogTrigger asChild>
          <div className="rounded-lg flex gap-3 justify-center items-center px-12 min-h-20 min-w-32 cursor-pointer transition-colors duration-300 text-frost bg-secondary active:opacity-75">
            <p className="text-xl uppercase font-medium">new</p>
            {/* @ts-ignore */}
            <Plus className="w-4 h-6 fill-current" />
          </div>
        </DialogTrigger>
        <DialogContent className="md:max-w-[30rem] p-8 md:p-10">
          <DialogHeader>
            <DialogTitle>Create new Death-note</DialogTitle>
            <DialogDescription>
              Make sure to enter all the values. Click create when you're done.
            </DialogDescription>
          </DialogHeader>
          <form className="" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <NewNoteFormField
                control={control}
                error={errors.userChampion?.message}
                name="userChampion"
                label="You"
                render={({ field }: any) => (
                  <Dropdown
                    text={field.value || "Champion"}
                    value={field.value}
                    list={champions}
                    onSelect={value => field.onChange(value)}
                  />
                )}
              />
              <NewNoteFormField
                control={control}
                error={errors.enemyChampion?.message}
                name="enemyChampion"
                label="Enemy"
                render={({ field }: any) => (
                  <Dropdown
                    text={field.value || "Champion"}
                    value={field.value}
                    list={champions}
                    onSelect={value => field.onChange(value)}
                  />
                )}
              />
              <NewNoteFormField
                control={control}
                error={errors.deaths?.message}
                name="deaths"
                render={({ field }: any) => (
                  <Input
                    type="number"
                    className="basis-8/12"
                    {...field}
                    min="0"
                    value={field.value}
                    placeholder="Enter number of deaths"
                    onChange={e => field.onChange(parseInt(e.target.value))}
                  />
                )}
              />
              <NewNoteFormField
                control={control}
                error={errors.date?.message}
                name="date"
                render={({ field }: any) => (
                  <DatePicker
                    value={field.value}
                    onChange={date => field.onChange(date)}
                  />
                )}
              />
              <NewNoteFormField
                control={control}
                error={errors.win?.message}
                name="win"
                render={({ field }: any) => (
                  // flex fixes the checkbox moving up and down
                  <Checkbox
                    className="flex"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">Create</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    )
  );
}
