"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShieldCheck } from "lucide-react";

const TERMS = [
  {
    title: "1. Acceptance of Terms",
    body: "By accessing or using this CRM platform, you agree to be bound by these Terms and Conditions. If you do not agree, you may not access the service. These terms apply to all users, including administrators, agents, and read-only members.",
  },
  {
    title: "2. Data Ownership",
    body: "All customer data you import or create within the platform remains your property. We do not sell, rent, or share your data with third parties except as required by law or as described in our Privacy Policy.",
  },
  {
    title: "3. Acceptable Use",
    body: "You agree to use the platform only for lawful business purposes. You may not use this service to send unsolicited communications, store illegal content, or attempt to gain unauthorized access to other accounts or systems.",
  },
  {
    title: "4. Account Security",
    body: "You are responsible for maintaining the confidentiality of your account credentials. Any activity that occurs under your account is your responsibility. Notify us immediately at security@yourcrm.com if you suspect unauthorized access.",
  },
  {
    title: "5. Subscription & Billing",
    body: "Paid plans are billed in advance on a monthly or annual basis. Cancellations take effect at the end of the current billing period. We reserve the right to modify pricing with 30 days' notice.",
  },
  {
    title: "6. Service Availability",
    body: "We strive for 99.9% uptime but do not guarantee uninterrupted access. Scheduled maintenance will be announced in advance. We are not liable for losses resulting from downtime beyond our reasonable control.",
  },
  {
    title: "7. Termination",
    body: "We may suspend or terminate your access if you violate these terms. Upon termination, you may export your data within 30 days. After that period, data may be permanently deleted from our servers.",
  },
  {
    title: "8. Limitation of Liability",
    body: "To the maximum extent permitted by law, our liability is limited to the amount you paid in the 12 months preceding the claim. We are not liable for indirect, incidental, or consequential damages of any kind.",
  },
  {
    title: "9. Governing Law",
    body: "These terms are governed by the laws of Nepal. Any disputes shall be resolved through binding arbitration in Kathmandu, Nepal, except where prohibited by local law.",
  },
  {
    title: "10. Changes to Terms",
    body: "We may update these terms from time to time. We will notify you by email or in-app notice at least 14 days before material changes take effect. Continued use after that date constitutes acceptance.",
  },
];

export default function TermsPage() {
  const [agreed, setAgreed] = useState(false);
  const router = useRouter();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden">
        {/* Header */}
        <CardHeader className="bg-white dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-800 px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 dark:bg-white">
              <ShieldCheck className="h-5 w-5 text-white dark:text-zinc-900" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                Before you continue
              </p>
              <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 leading-tight">
                Terms & Conditions
              </h1>
            </div>
          </div>
          <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Please read these terms carefully. They govern your use of our CRM
            platform and describe your rights and responsibilities as a user.
          </p>
        </CardHeader>

        {/* Scrollable terms */}
        <CardContent className="p-0">
          <ScrollArea className="h-80 px-8 py-6">
            <div className="space-y-6">
              {TERMS.map((section) => (
                <div key={section.title}>
                  <h2 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1">
                    {section.title}
                  </h2>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {section.body}
                  </p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>

        {/* Footer */}
        <CardFooter className="flex flex-col gap-4 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800 px-8 py-6">
          <label className="flex items-start gap-3 cursor-pointer group">
            <Checkbox
              checked={agreed}
              onCheckedChange={(val) => setAgreed(val === true)}
              className="mt-0.5 shrink-0"
            />
            <span className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed group-hover:text-zinc-900 dark:group-hover:text-zinc-200 transition-colors">
              I have read and agree to the{" "}
              <span className="font-medium text-zinc-900 dark:text-zinc-100">
                Terms & Conditions
              </span>{" "}
              and understand how my data will be used.
            </span>
          </label>

          <Button
            className="w-full h-11 rounded-xl font-medium text-sm transition-all"
            disabled={!agreed}
            onClick={() => router.push("/dashboard")}
          >
            Agree & Continue
          </Button>

          <p className="text-xs text-center text-zinc-400 dark:text-zinc-600">
            Last updated · June 2025 · Version 1.0
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
