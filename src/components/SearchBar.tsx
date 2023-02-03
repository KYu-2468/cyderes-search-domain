import React, { useState, BaseSyntheticEvent } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar(props: { handleSearch: Function }) {
  const { handleSearch } = props;
  const [domainName, setDomainName] = useState<String>("");
  const isLaptop = useMediaQuery("(min-width:600px)");

  function handleSearchChange(event: BaseSyntheticEvent) {
    event.preventDefault();
    setDomainName(event.target.value);
  }

  return (
    <>
      <Box
        component="form"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          "& .MuiTextField-root": { m: 1, width: isLaptop ? "40%" : "70%" },
          "& button": { m: 1, p: 1, width: "15%", height: "100%" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          required
          onChange={handleSearchChange}
          id="outlined-search"
          label="Search domain name or IP address"
          type="search"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "100%" },
          }}
        />

        <Button variant="contained" onClick={() => handleSearch(domainName)}>
          <SearchIcon />
        </Button>
      </Box>
    </>
  );
}
