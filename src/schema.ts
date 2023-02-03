import { WHOISAPI } from "./datasources/whois-api";

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

export const resolvers = {
  Query: {
    async domain(
      parent: any,
      { domainName: address }: { domainName: string },
      { dataSources: { whoisAPI } }: { dataSources: { whoisAPI: WHOISAPI } }
    ) {
      // Re
      const {
        createdDate,
        updatedDate,
        expiresDate,
        organization,
        state,
        country,
        countryCode,
        domainName,
        registrarName,
        registrarIANAID,
        ip,
        domainAvailability,
      } = await whoisAPI.getDomainInfo(address);

      return {
        createdDate,
        updatedDate,
        expiresDate,
        organization,
        state,
        country,
        countryCode,
        domainName,
        registrarName,
        registrarIANAID,
        ip,
        domainAvailability,
      };
    },
  },
};
