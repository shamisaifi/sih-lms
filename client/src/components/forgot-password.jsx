import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { LuLoader2 } from "react-icons/lu";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebase";
import { useNavigate } from "react-router-dom";

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
});

export default function ForgotPassword() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async ({ email }) => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-2">
        <div className="grid gap-1">
          <Label className="sr-only" htmlFor="email">
            Email
          </Label>
          <Input
            id="email"
            placeholder="Email"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            disabled={isSubmitting}
            {...register("email")}
          />
          {errors.email && (
            <span className="text-sm text-red-500">{errors.email.message}</span>
          )}
        </div>
        <Button disabled={isSubmitting}>
          {isSubmitting && <LuLoader2 className="mr-2 h-4 w-4 animate-spin" />}
          Send Reset Email
        </Button>

        <Button
          variant="ghost"
          onClick={() => {
            navigate("/login");
          }}
        >
          Back
        </Button>
      </div>
    </form>
  );
}
