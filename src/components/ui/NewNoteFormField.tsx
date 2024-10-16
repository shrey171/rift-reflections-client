import { Label } from "@radix-ui/react-label";
import { Controller } from "react-hook-form";

interface IProps {
  name: string;
  label?: string;
  error?: string;
  control?: any;
  render?: any;
}

export const NewNoteFormField = (props: IProps) => {
  const { error, control, render, name, label } = props;
  return (
    <div>
      <div className="flex gap-x-2 justify-between items-center">
        <Label htmlFor={name} className="capitalize">
          {label || name}
        </Label>
        <div className="basis-8/12">
          <Controller name={name} control={control} render={render} />
        </div>
      </div>
      {error && <p className="text-red-500 basis-full">{error}</p>}
    </div>
  );
};
