import pkg from "../package.json";
import schemas from "./schemas/index.js";
import mutations from "./mutations/index.js";
import resolvers from "./resolvers/index.js";
import { BillingDetails } from "./simpleSchema.js";
/**
 * @summary Import and call this function to add this plugin to your API.
 * @param {ReactionAPI} app The ReactionAPI instance
 * @returns {undefined}
 */
export default async function register(app) {
  await app.registerPlugin({
    label: "Billing Extension",
    name: "billing-extension",
    version: pkg.version,
    graphQL: {
      resolvers,
      schemas
    },
    mutations,
    simpleSchemas: {
      BillingDetails
    }
  });
}
