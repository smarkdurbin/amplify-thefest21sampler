"use client";

import {
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";

interface PerformerListFilterProps extends InputProps {
  changeCallback: (searchTerm: string) => void;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const PerformerListFilter = ({
  changeCallback,
  setSearchQuery,
}: PerformerListFilterProps) => {
  // State
  const [value, setValue] = useState<string>("");

  // Hook
  useEffect(() => {
    // Delay debounce
    const delayDebounceFn = setTimeout(() => {
      // Set search query
      setSearchQuery(value);
    }, 200);

    return () => clearTimeout(delayDebounceFn);
  }, [changeCallback, setSearchQuery, value]);

  return (
    <InputGroup marginBottom={4} marginTop={4}>
      <InputLeftElement pointerEvents="none">
        <Icon as={IoMdSearch} color="gray.300" />
      </InputLeftElement>
      <Input
        borderRadius="full"
        onChange={(e) => {
          changeCallback && changeCallback(e.target.value);
          setValue(e.target.value);
        }}
        placeholder="Search performers"
        value={value}
      />
    </InputGroup>
  );
};

export default PerformerListFilter;
