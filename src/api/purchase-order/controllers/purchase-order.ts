/**
 * purchase-order controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::purchase-order.purchase-order', ({ strapi }) => ({
    async find(ctx) {
        try {
            const data = await strapi.entityService.findMany('api::purchase-order.purchase-order', {
                populate : ["purchaseOrderDetails"]
            });
            ctx.body = { data };
        } catch(err) {
            ctx.body = err;
        }
    }
}));
