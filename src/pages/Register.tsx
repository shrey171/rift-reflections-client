import { Button, Input, Label } from "components/ui";
import { useAuth } from "hooks";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { Link } from "react-router-dom";

const registerSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Both passwords must match",
        path: ["confirmPassword"],
      });
    }
  });

type TRegisterFormValues = z.infer<typeof registerSchema>;

export const Register = () => {
  const mutation = useAuth({ type: "register" });
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading, isSubmitting },
    setError,
  } = useForm<TRegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: TRegisterFormValues) => {
    try {
      await mutation(data);
    } catch (e: any) {
      setError("root", { message: e?.message || "Registration Failed" });
    }
  };

  return (
    <div className="flex flex-col gap-16 justify-center items-center w-full  min-h-screen">
      <h1 className="text-3xl text-center">
        Create your new account of
        <br />
        <span className="font-bold">Rift Reflections</span>
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="w-10/12 max-w-md grid">
        <div>
          <Label htmlFor="email" className="capitalize font-semibold text-lg">
            email
          </Label>
          <Input
            className={twMerge(
              "mt-1 py-5 text-base font-medium",
              errors.email && "border-red-500"
            )}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="mt-6">
          <Label
            htmlFor="password"
            className="capitalize font-semibold text-lg">
            password
          </Label>
          <Input
            className={twMerge(
              "mt-1 py-5 text-base font-medium",
              errors.password && "border-red-500"
            )}
            type="password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>
        <div className="mt-6">
          <Label
            htmlFor="confirmPassword"
            className="capitalize font-semibold text-lg">
            confirm password
          </Label>
          <Input
            className={twMerge(
              "mt-1 py-5 text-base font-medium",
              errors.confirmPassword && "border-red-500"
            )}
            type="password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>
        <div className="mt-12">
          {errors?.root && (
            <p className="text-red-500">{errors?.root?.message}</p>
          )}
          <Button
            disabled={isLoading || isSubmitting}
            className="text-lg font-semibold w-full py-6 mt-2"
            type="submit">
            Register
          </Button>
          <p className="mt-3">
            Already have an account?{" "}
            <Link className="underline" to="/login" replace>
              Login here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};
