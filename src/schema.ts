// Schema end point for the graphql server

export const typeDefs = `#graphql
  type Query {
    domain(domainName: String!): DomainInfo
  }

  type DomainInfo {
    createdDate: String
    updatedDate: String
    expiresDate: String
    organization: String
    state: String
    country: String
    countryCode: String
    domainName: String
    registrarName: String
    registrarIANAID: String
    ip: String
    domainAvailability: String
  }
`;
