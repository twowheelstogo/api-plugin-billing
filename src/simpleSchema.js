import SimpleSchema from "simpl-schema";

/**
 * @name Billing
 * @memberof Schemas
 * @type {SimpleSchema}
 * @property {String} customerName optional
 * @property {String} nit optional
 * @property {String} address optional
 */
export const BillingDetails = new SimpleSchema({
    customerName: {
        type: String,
        optional: true
    },
    nit:{
        type: String,
        max: 9,
        optional: true
    },
    address:{
        type: String,
        optional:true
    }
});
