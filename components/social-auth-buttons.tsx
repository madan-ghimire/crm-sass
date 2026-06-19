import Image from "next/image";
import SocialButton from "./social-button";
import { createClient } from "@/lib/supabase/client";

type provider = "google" | "facebook" | "github";

type providerType = {
  name: provider;
  label: string;
  icon: string;
  size: number;
};

const providers: providerType[] = [
  {
    name: "google",
    label: "Continue with Google",
    icon: "/google.svg",
    size: 18,
  },

  {
    name: "facebook",
    label: "Continue with Facebook",
    icon: "/facebook.svg",
    size: 18,
  },
  {
    name: "github",
    label: "Continue with Github",
    icon: "/github.svg",
    size: 18,
  },
];

export default function SocialAuthButtons() {
  const handleOAuthLogin = async (provider: provider) => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      {" "}
      {providers.map((provider: providerType) => (
        <SocialButton
          action={() => handleOAuthLogin(provider.name)}
          key={provider.name}
        >
          <Image
            src={provider.icon}
            width={provider.size}
            height={provider.size}
            alt={provider.name}
          />
          {provider.label}
        </SocialButton>
      ))}
    </div>
  );
}
