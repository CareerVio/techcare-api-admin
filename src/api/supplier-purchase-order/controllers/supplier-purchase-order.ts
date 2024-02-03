/**
 * supplier-purchase-order controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::supplier-purchase-order.supplier-purchase-order', ({ strapi }) => ({
    async find(ctx) {
        try {
            const data = await strapi.entityService.findMany('api::supplier-purchase-order.supplier-purchase-order', {
                populate : ["file"]
            });
            ctx.body = { data };
        } catch(err) {
            ctx.body = err;
        }
    }
}));
