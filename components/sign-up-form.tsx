// "use client";

// import { signup } from "@/actions/auth/signup";
// import Link from "next/link";
// import React, { useState } from "react";
// import { Input } from "./ui/input";
// import { Button } from "./ui/button";

// export function SignUpForm({
//   className,
//   ...props
// }: React.ComponentPropsWithoutRef<"div">) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const handleSignUp = async (e: React.SubmitEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     console.log("handle signup clicked", e);

//     console.log("email:", email, "password:", password);

//     if (password !== confirmPassword) {
//       alert("Passwords do not match");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("email", email);
//     formData.append("password", password);

//     const payload = {
//       email,
//       password,
//       confirmPassword,
//     };

//     console.log("signup form values", payload);

//     console.log("check formdata here i am", formData);

//     try {
//       const result = await signup(formData);
//       // Reset form fields after successful signup
//       if (!result.success) {
//         alert(result.message);
//         return;
//       }
//       setEmail("");
//       setPassword("");
//       setConfirmPassword("");

//       alert(result.message);
//     } catch (error) {
//       console.error("Signup failed:", error);
//     }
//   };

//   return (
//     <form
//       //   action={signup}
//       onSubmit={handleSignUp}
//       className="h-screen flex items-center justify-center"
//     >
//       <div className="border shadow-2xl rounded-lg p-6 flex flex-col items-center gap-3">
//         <h2 className="text-2xl font-semibold">Sign Up</h2>
//         <Input
//           name="email"
//           className="border p-2 rounded w-64"
//           type="email"
//           placeholder="Email"
//           required
//           value={email}
//           onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//             setEmail(e.target.value)
//           }
//         />
//         <Input
//           name="password"
//           className="border p-2 rounded w-64"
//           type="password"
//           placeholder="Password"
//           required
//           value={password}
//           onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//             setPassword(e.target.value)
//           }
//         />
//         <Input
//           // name="confirm_password"
//           className="border p-2 rounded w-64"
//           type="password"
//           placeholder="Confirm password"
//           required
//           value={confirmPassword}
//           onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//             setConfirmPassword(e.target.value)
//           }
//         />
//         {/* <button className="bg-black text-white px-4 py-2 rounded-md cursor-pointer">
//           Sign Up
//         </button> */}

//         <Button className="cursor-pointer">Sign Up</Button>

//         <div className="text-center text-sm">
//           Already have an account?{" "}
//           <Link href="/auth/login" className="underline underline-offset-4">
//             Sign In
//           </Link>
//         </div>
//       </div>
//     </form>
//   );
// }

"use client";

import { signup } from "@/actions/auth/signup";
import Link from "next/link";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

import { Loader2 } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import SocialAuthButtons from "./social-auth-buttons";
import { toast } from "sonner";

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("handle signup clicked", e);

    setError(null);
    setSuccessMessage(null);
    setIsLoading(true);

    console.log("email:", email, "password:", password);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("organizationName", organizationName);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);

    const payload = {
      email,
      password,
      confirmPassword,
    };

    console.log("signup form values", payload);

    console.log("check formdata here i am", formData);

    try {
      const result = await signup(formData);
      // Reset form fields after successful signup
      if (!result.success) {
        setError(result.message);
        return;
      }
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setOrganizationName("");
      setUsername("");

      setSuccessMessage(result.message);
      toast("Register successful", { position: "bottom-right" });
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to create account",
      );
      console.error("Signup failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/40 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-muted-foreground/10 bg-background">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center tracking-tight">
            Create Account
          </CardTitle>

          <CardDescription className="text-center text-sm text-muted-foreground">
            Create your CRM workspace and get started
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-4">
          {/* Social Signup */}
          <div className="flex flex-col gap-2.5">
            <SocialAuthButtons />
          </div>

          {/* Divider */}
          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-muted" />
            </div>

            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 mt-2 text-muted-foreground">
                Or continue with email
              </span>
            </div>
          </div>

          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="space-y-2">
              <Input
                placeholder="Organization Name"
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
                required
              />

              <Input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            <div className="space-y-2">
              <Input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            <div className="space-y-2">
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            {error && (
              <div className="rounded-md border border-destructive/20 bg-destructive/10 p-3">
                <p className="text-xs font-medium text-destructive">{error}</p>
              </div>
            )}

            {successMessage && (
              <div className="rounded-md border border-emerald-200 bg-emerald-50 p-3">
                {" "}
                <p className="text-sm font-medium text-emerald-700">
                  {" "}
                  {successMessage}{" "}
                </p>{" "}
              </div>
            )}

            <Button type="submit" className="w-full mt-2" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-wrap items-center justify-center border-t border-muted/50 pt-4">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
            >
              Sign In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
