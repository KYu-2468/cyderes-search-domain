import React, { useState } from "react";
import SearchBar from "./SearchBar";
import DisplayDomainInfo from "./DisplayDomainInfo";

export default function Search() {
  const [domainName, setDomainName] = useState<String>("");

  function handleSearch(domain: String) {
    setDomainName(domain);
  }

  return (
    <>
      <SearchBar handleSearch={handleSearch} />
      {domainName && <DisplayDomainInfo domainName={domainName} />}
    </>
  );
}
