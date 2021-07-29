import SimpleSchema from "simpl-schema";
import { BillingDetails as BillingSchema } from "../simpleSchema.js";
import hashToken from "@reactioncommerce/api-utils/hashToken.js";
import ReactionError from "@reactioncommerce/reaction-error";

const inputSchema = new SimpleSchema({
    billing: BillingSchema,
    cartId: String,
    cartToken: {
        type: String,
        optional: true
    }
})
/**
 * @method setBillingDetailsOnCart
 * @summary Sets the billing details for a checkout on a cart that have
 * @param {Object} context - an object containing the per-request state
 * @param {Object} input - Input (see SimpleSchema)
 * @returns {Promise<Object>} An object with a `cart` property containing the updated cart
 */
export default async function setBillingDetailsOnCart(context,input) {
    const cleanedInput = inputSchema.clean(input);
    inputSchema.validate(cleanedInput);
    const { collections:{Cart},accountId } = context;
    const {billing, cartId, cartToken} = cleanedInput;
    const selector = { _id: cartId };

  if (cartToken) {
    selector.anonymousAccessToken = hashToken(cartToken);
  }
  console.log(selector);
    const cart = await Cart.findOne(selector);
    if (!cart) {
        throw new ReactionError("not-found", "Cart not found");
      }
    
      if (cart && cart.accountId && cart.accountId !== accountId) {
        throw new ReactionError("access-denied", "Access Denied");
      }
    const updatedCart = {
        ...cart,
        billingDetails: billing,
        updatedAt: new Date()
    };
    console.log(updatedCart);
    const savedCart = await context.mutations.saveCart(context, updatedCart);

    return { cart: savedCart };
}