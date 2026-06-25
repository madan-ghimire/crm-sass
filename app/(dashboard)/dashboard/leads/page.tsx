import { LeadList } from "@/features/leads";
import type { LeadSearchParams } from "@/features/leads/types";

export default function LeadsPage({ searchParams }: LeadSearchParams) {
  return <LeadList searchParams={searchParams} />;
}
