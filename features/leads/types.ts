export interface LeadSearchParams {
  searchParams: Promise<{
    search?: string;
    status?: string;
  }>;
}
