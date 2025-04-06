import { Button, Input, Label } from "components/ui";
import { useAuth } from "hooks";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { Link } from "react-router-dom";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type TLoginFormValues = z.infer<typeof loginSchema>;

export const Login = () => {
  const login = useAuth({ type: "login" });
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading, isSubmitting },
    setError,
  } = useForm<TLoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: TLoginFormValues) => {
    try {
      await login(data);
    } catch (e: any) {
      const valdiationErrors = e?.data?.valdiationErrors;
      if (!valdiationErrors) {
        return setError("root", { message: e?.data?.message || "Login Failed" });
      }
      Object.keys(valdiationErrors).forEach(key => {
        //@ts-ignore
        setError(key, { message: valdiationErrors[key] });
      });
    }
  };

  return (
    <div className="flex flex-col gap-16 justify-center items-center w-full  min-h-screen">
      <h1 className="text-3xl">
        Log into <span className="font-bold">Rift Reflections</span>
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
        <div className="mt-12">
          {errors?.root && (
            <p className="text-red-500">{errors?.root?.message}</p>
          )}
          <Button
            disabled={isLoading || isSubmitting}
            className="text-lg font-semibold w-full py-6 mt-2"
            type="submit">
            Login
          </Button>
          <p className="mt-3">
            Don't have an account?{" "}
            <Link className="underline" to="/register" replace>
              Register here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};
