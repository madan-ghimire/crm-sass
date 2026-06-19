interface Props {
  searchParams: Promise<{
    search?: string;
    status?: string;
  }>;
}

export default async function Contacts({ searchParams }: Props) {
  const { search, status } = await searchParams;

  console.log("search:", search);
  console.log("status:", status);
  return (
    <div>
      <h2>This my contacts page</h2>
    </div>
  );
}
