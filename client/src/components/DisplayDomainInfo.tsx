import React from "react";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { useQuery, gql } from "@apollo/client";

const GET_DOMAIN_INFO = gql`
  query GetDomainInfo($domainName: String!) {
    domain(domainName: $domainName) {
      domainName
      organization
      state
      country
      countryCode
      registrarName
      registrarIANAID
      ip
      domainAvailability
      createdDate
      updatedDate
      expiresDate
    }
  }
`;

export default function DisplayDomainInfo(props: { domainName: String }) {
  const { domainName } = props;
  const { loading, error, data } = useQuery(GET_DOMAIN_INFO, {
    variables: { domainName },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const properties = Object.keys(data.domain);
  properties.shift();

  return (
    <>
      <TableContainer
        sx={{
          m: 4,
          width: "80%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
        component={Paper}
      >
        <Table sx={{ width: "100%" }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Type</StyledTableCell>
              <StyledTableCell align="right">Info</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {properties.map((property) => (
              <StyledTableRow key={property}>
                <StyledTableCell component="th" scope="row">
                  {property}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {data.domain[property]}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
