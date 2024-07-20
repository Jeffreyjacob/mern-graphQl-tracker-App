import { mergeResolvers } from "@graphql-tools/merge";
import userResolver from "./user.js";
import transactionResolver from "./transaction.js";

const mergedResolvers = mergeResolvers([userResolver,transactionResolver]);

export default mergedResolvers;