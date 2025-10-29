import React, { useState, useEffect } from "react";
import { Box, TextField, IconButton, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useDebounce } from "../hooks/useDebounce";
import { useGithub } from "../context/GithubProvider";

const SearchBar: React.FC = () => {
  const { searchUser, clear } = useGithub();
  const [value, setValue] = useState("");
  const debounced = useDebounce(value, 500);

  useEffect(() => {
    if (debounced && debounced.trim() !== "") searchUser(debounced.trim());
    else if (debounced === "") clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  return (
    <Box display="flex" alignItems="center" p={2}>
      <TextField
        fullWidth
        variant="outlined"
        value={value}
        placeholder="Search GitHub username (e.g. torvalds)"
        onChange={(e) => setValue(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="clear"
                size="small"
                onClick={() => {
                  setValue("");
                  clear();
                }}
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default SearchBar;
