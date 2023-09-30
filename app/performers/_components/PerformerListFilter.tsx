"use client";

import {
  Button,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  InputRightElement,
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

  // Handle click
  const handleClick = () => {
    // Set search query
    setSearchQuery("");

    // Set value
    setValue("");
  };

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
      {value && (
        <InputRightElement width="4.5rem">
          <Button
            borderRadius="full"
            height="1.75rem"
            size="sm"
            onClick={handleClick}
          >
            Clear
          </Button>
        </InputRightElement>
      )}
    </InputGroup>
  );
};

export default PerformerListFilter;
