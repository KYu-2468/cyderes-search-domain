interface Registrant {
  organization: String;
  state: String;
  country: String;
  countryCode: String;
  rawText: String;
}

export const typeDefs = `#graphql
  type Query {
    domainName(domainName: String!): DomainInfo
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
    status: String
    rawText: String
    registrarName: String
    registrarIANAID: String
  }
`;

export const resolvers = {
  Query: {
    async domainName(
      parent: any,
      { domainName: addres }: { domainName: String },
      contextValue: any
    ) {
      const { WhoisRecord } =
        await contextValue.dataSources.whoisAPI.getDomainInfo(addres);

      const {
        createdDate,
        updatedDate,
        expiresDate,
        registrant,
        domainName,
        status,
        rawText,
        registrarName,
        registrarIANAID,
      }: {
        createdDate: String;
        updatedDate: String;
        expiresDate: String;
        registrant: Registrant;
        domainName: String;
        status: String;
        rawText: String;
        registrarName: String;
        registrarIANAID: String;
      } = WhoisRecord;

      return {
        createdDate,
        updatedDate,
        expiresDate,
        organization: registrant.organization,
        state: registrant.state,
        country: registrant.country,
        countryCode: registrant.countryCode,
        domainName,
        status,
        rawText,
        registrarName,
        registrarIANAID,
      };
    },
  },
};
