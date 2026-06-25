"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Search, X } from "lucide-react";
import React, { useState } from "react";
import { Input } from "../ui/input";

export function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [value, setValue] = useState(() => searchParams.get("search") ?? "");

  const search = useDebouncedCallback((searchValue: string) => {
    const params = new URLSearchParams(searchParams.toString());

    console.log("check params", params);

    if (searchValue.trim()) {
      params.set("search", searchValue.trim());
    } else {
      params.delete("search");
    }

    console.log("check params after set:", params.get("search"));

    router.replace(`/dashboard/leads?${params.toString()}`);
  }, 400);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const nextValue = e.target.value;

    setValue(nextValue);
    search(nextValue);
  }

  function clearSearch() {
    setValue("");
    search.cancel();
    const params = new URLSearchParams(searchParams.toString());

    params.delete("search");
    router.replace(`/dashboard/leads?${params.toString()}`);
  }

  return (
    <div className="flex items-center w-full max-w-sm">
      {/* <Search size={18} className="text-muted-foreground" /> */}

      {/* <Input
        value={value}
        onChange={handleChange}
        placeholder="Search leads..."
        className="flex-1 px-2 outline-none bg-transparent"
      /> */}

      <Input
        placeholder="Search leads…"
        leadingIcon={<Search size={16} className="p-0.5" />}
        trailingIcon={
          value && (
            <button onClick={clearSearch} aria-label="Clear">
              <X size={16} className="cursor-pointer" />
            </button>
          )
        }
        value={value}
        onChange={handleChange}
      />

      {/* <button
        type="button"
        onClick={clearSearch}
        className="text-muted-foreground hover:text-foreground"
      >
        <X size={16} className="cursor-pointer" />
      </button> */}
    </div>
  );
}
