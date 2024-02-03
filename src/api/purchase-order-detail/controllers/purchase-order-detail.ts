/**
 * purchase-order-detail controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::purchase-order-detail.purchase-order-detail', ({ strapi }) => ({
    async find(ctx) {
        try {
            const data = await strapi.entityService.findMany('api::purchase-order-detail.purchase-order-detail', {
                populate : ["purchase_order"]
            });
            ctx.body = { data };
        } catch(err) {
            ctx.body = err;
        }
    }
}));
