import { WHOISAPI } from "./datasources/whois-api";

interface DomainArguments {
  domainName: string;
}

interface ContextValue {
  dataSources: {
    whoisAPI: WHOISAPI;
  };
}

export const resolvers = {
  Query: {
    // Get domain information using RESTdataSource from WHOIS API
    async domain(_: any, args: DomainArguments, contextValue: ContextValue) {
      const {
        dataSources: { whoisAPI },
      } = contextValue;
      const { domainName } = args;

      return await whoisAPI.getDomainInfo(domainName);
    },
  },
};
