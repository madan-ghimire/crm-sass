import React from "react";
import { Button } from "./ui/button";

interface SocialButtonProps {
  children: React.ReactNode;
  action: () => void;
}

export default function SocialButton({ action, children }: SocialButtonProps) {
  return (
    <Button
      onClick={action}
      variant="outline"
      className="w-full cursor-pointer"
    >
      {children}
    </Button>
  );
}
