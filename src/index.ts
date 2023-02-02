// "use strict";

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { WHOISAPI } from "./datasources/whois-api.js";
import { typeDefs, resolvers } from "./schema.js";
import * as dotenv from "dotenv";

dotenv.config();

interface Context {
  // Context typing
  dataSources: {
    whoisAPI: WHOISAPI;
  };
}

const PORT: String = process.env.PORT || "8080";

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: +PORT },
  context: async ({ req }) => {
    const { cache } = server;
    return {
      dataSources: {
        whoisAPI: new WHOISAPI({ cache }),
      },
    };
  },
});

console.log(`🚀 Server ready at: ${url}`);

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
