/**
 * receipt controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::receipt.receipt', ({ strapi }) => ({
    async find(ctx) {
        try {
            const data = await strapi.entityService.findMany('api::receipt.receipt', {
                populate : ["receiptDetails"]
            });
            ctx.body = { data };
        } catch(err) {
            ctx.body = err;
        }
    }
}));
