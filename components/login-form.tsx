"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Mail, Lock, Loader2 } from "lucide-react";

// shadcn/ui components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import SocialAuthButtons from "./social-auth-buttons";
import Separator from "./seperator";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const supabase = createClient();

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      toast("Login successful", { position: "bottom-right" });

      router.push("/dashboard");
    } catch (error: unknown) {
      console.error("Login error:", error);
      setError(
        error instanceof Error
          ? error.message
          : "An error occurred while logging in",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/40 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-muted-foreground/10 bg-background">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center tracking-tight">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-center text-sm text-muted-foreground">
            Sign in to continue to your CRM workspace
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-4">
          {/* Social Logins */}
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
                Or continue with
              </span>
            </div>
          </div>

          {/* Native Credentials Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Input
                id="email"
                type="email"
                placeholder="Email"
                className="pl-9"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                // leadingIcon={<Mail />}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Link
                  href="/forgot-password"
                  className="text-xs text-muted-foreground hover:text-primary underline-offset-4 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                className="pl-9"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                // leadingIcon={<Lock />}
              />
            </div>

            {error && (
              <div className="rounded-md border border-destructive/20 bg-destructive/10 p-3">
                <p className="text-xs font-medium text-destructive">{error}</p>
              </div>
            )}

            <Button type="submit" className="w-full mt-2" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-wrap items-center justify-center border-t border-muted/50 pt-4">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/signup"
              className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
            >
              Sign Up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

// "use client";

// import Link from "next/link";
// import { createClient } from "@/lib/supabase/client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Input } from "@/components/ui/input";
// import { Mail, Lock } from "lucide-react";
// import { cn } from "@/lib/utils";

// export function LoginForm() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     const supabase = createClient();
//     try {
//       const { error } = await supabase.auth.signInWithPassword({
//         email,
//         password,
//       });
//       if (error) throw error;
//       router.push("/dashboard");
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "An error occurred");
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function handleOAuth(provider: "google" | "facebook") {
//     const supabase = createClient();
//     await supabase.auth.signInWithOAuth({
//       provider,
//       options: {
//         redirectTo: `${window.location.origin}/auth/callback`,
//       },
//     });
//   }

//   return (
//     <div className="h-screen flex items-center justify-center bg-background">
//       <div className="w-80 border rounded-xl shadow-lg p-6 flex flex-col gap-4 bg-background">
//         <div className="text-center">
//           <h2 className="text-2xl font-semibold tracking-tight">Sign In</h2>
//           <p className="text-sm text-muted-foreground mt-1">Welcome back</p>
//         </div>

//         {/* OAuth buttons */}
//         <div className="flex flex-col gap-2">
//           <button
//             type="button"
//             onClick={() => handleOAuth("google")}
//             className="flex items-center justify-center gap-2 w-full border border-input rounded-lg px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
//           >
//             <GoogleIcon />
//             Continue with Google
//           </button>
//           <button
//             type="button"
//             onClick={() => handleOAuth("facebook")}
//             className="flex items-center justify-center gap-2 w-full border border-input rounded-lg px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
//           >
//             <FacebookIcon />
//             Continue with Facebook
//           </button>
//         </div>

//         {/* Divider */}
//         <div className="flex items-center gap-2">
//           <div className="flex-1 h-px bg-border" />
//           <span className="text-xs text-muted-foreground">or</span>
//           <div className="flex-1 h-px bg-border" />
//         </div>

//         {/* Email/password form */}
//         <form onSubmit={handleLogin} className="flex flex-col gap-3">
//           <Input
//             type="email"
//             placeholder="Email address"
//             required
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             // leadingIcon={<Mail />}
//           />
//           <Input
//             type="password"
//             placeholder="Password"
//             required
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             // leadingIcon={<Lock />}
//           />

//           {error && <p className="text-xs text-destructive">{error}</p>}

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-foreground text-background rounded-lg py-2 text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
//           >
//             {loading ? "Signing in…" : "Sign In"}
//           </button>
//         </form>

//         <p className="text-center text-sm text-muted-foreground">
//           Don&apos;t have an account?{" "}
//           <Link
//             href="/signup"
//             className="text-foreground underline underline-offset-4"
//           >
//             Sign Up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// function GoogleIcon() {
//   return (
//     <svg width="16" height="16" viewBox="0 0 24 24">
//       <path
//         d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//         fill="#4285F4"
//       />
//       <path
//         d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//         fill="#34A853"
//       />
//       <path
//         d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//         fill="#FBBC05"
//       />
//       <path
//         d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//         fill="#EA4335"
//       />
//     </svg>
//   );
// }

// function FacebookIcon() {
//   return (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="#1877F2">
//       <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
//     </svg>
//   );
// }
