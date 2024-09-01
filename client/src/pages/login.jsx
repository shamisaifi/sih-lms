import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { useUser } from "@/providers/auth-provider";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaGoogle } from "react-icons/fa";
import { LuLoader2 } from "react-icons/lu";
import ForgotPassword from "@/components/forgot-password";

import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "@/firebase";

const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useUser();

  const isForgotPassword = new URLSearchParams(location.search).has(
    "forgot-password"
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const handleGoogleSignin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const user = await signInWithPopup(auth, provider);
      localStorage.setItem("user", JSON.stringify(user));

      setUser(user);

      navigate("/portal");
    } catch (error) {
      console.error(error);
    }
  };

  const handleEmailSignin = async (email, password) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("user", JSON.stringify(user));

      setUser(user);

      navigate("/portal");
    } catch (error) {
      console.error(error);

      toast.error("Invalid email or password");
    }
  };

  const handleForgotPasswordPage = async () => {
    navigate(`?forgot-password`);
  };

  async function onSubmit(event) {
    await handleEmailSignin(event.email, event.password);
  }

  return (
    <div className={"grid gap-6"}>
      {isForgotPassword ? (
        <ForgotPassword />
      ) : (
        <>
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
                  <span className="text-sm text-red-500">
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="password">
                  Password
                </Label>
                <Input
                  id="password"
                  placeholder="Password"
                  type="password"
                  autoCapitalize="none"
                  disabled={isSubmitting}
                  {...register("password")}
                />
                {errors.password && (
                  <span className="text-sm text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </div>

              <div className="grid gap-1 text-xs my-2 text-center">
                <Button
                  type="button"
                  variant="link"
                  onClick={handleForgotPasswordPage}
                >
                  Forgot Password?
                </Button>
              </div>

              <Button disabled={isSubmitting}>
                {isSubmitting && (
                  <LuLoader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Sign In with Email
              </Button>
            </div>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <Button
            variant="outline"
            type="button"
            disabled={isSubmitting}
            onClick={handleGoogleSignin}
          >
            {isSubmitting ? (
              <LuLoader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <FaGoogle className="mr-2 h-4 w-4" />
            )}{" "}
            Google
          </Button>
        </>
      )}
    </div>
  );
}
