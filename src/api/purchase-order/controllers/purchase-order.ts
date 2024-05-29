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
    },
    async findOne(ctx) {
        try {
            const { id } = ctx.params;
            const data = await strapi.entityService.findOne('api::purchase-order.purchase-order',id, {
                populate : ["purchaseOrderDetails"]
            });
            ctx.body = { data };
        } catch(err) {
            ctx.body = err;
        }
    }
}));
