"use strict";

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { typeDefs } from "./schema.js";
import { resolvers } from "./resolvers.js";
import { WHOISAPI } from "./datasources/whois-api.js";

import * as dotenv from "dotenv";

// Setup environment variables in .env file
dotenv.config();

// Setup port to listen to; defaults to 8080
const port: String = process.env.PORT || "8080";

// Create Apollo server
const server = new ApolloServer({ typeDefs, resolvers });

// Initialize Apollo server
const { url } = await startStandaloneServer(server, {
  listen: { port: +port },
  context: async ({ req }) => {
    const { cache } = server;
    return {
      dataSources: {
        whoisAPI: new WHOISAPI({ cache }),
      },
    };
  },
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests

console.log(`🚀 Server ready at: ${url}`);
