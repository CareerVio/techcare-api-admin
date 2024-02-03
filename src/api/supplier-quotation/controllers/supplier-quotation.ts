/**
 * supplier-quotation controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::supplier-quotation.supplier-quotation', ({ strapi }) => ({
    async find(ctx) {
        try {
            const data = await strapi.entityService.findMany('api::supplier-quotation.supplier-quotation', {
                populate : ["file"]
            });
            ctx.body = { data };
        } catch(err) {
            ctx.body = err;
        }
    }
}));
