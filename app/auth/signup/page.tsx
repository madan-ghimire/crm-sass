// import { signup } from "@/actions/auth/signup";

import { SignUpForm } from "@/components/sign-up-form";

// export default function SignupPage() {
// return (
//   <form
//     action={signup}
//     className="h-screen flex flex-col items-center justify-center gap-3"
//   >
//     <h1 className="text-2xl font-semibold">Sign Up</h1>{" "}
//     <input
//       name="email"
//       className="border p-2 rounded w-64"
//       type="email"
//       placeholder="Email"
//       required
//     />
//     <input
//       name="password"
//       className="border p-2 rounded w-64"
//       type="password"
//       placeholder="Password"
//       required
//     />
//     <button className="bg-black text-white p-2 rounded-md cursor-pointer">
//       Sign Up
//     </button>
//   </form>
// );
// }

export default function Page() {
  return (
    <div>
      <SignUpForm />
    </div>
  );
}
