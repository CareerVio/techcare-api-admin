/**
 * receipt-detail controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::receipt-detail.receipt-detail', ({ strapi }) => ({
    async find(ctx) {
        try {
            const data = await strapi.entityService.findMany('api::receipt-detail.receipt-detail', {
                populate : ["receipt"]
            });
            ctx.body = { data };
        } catch(err) {
            ctx.body = err;
        }
    }
}));
