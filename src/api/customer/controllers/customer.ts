/**
 * customer controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::customer.customer', ({ strapi }) => ({
    async find(ctx) {
        try {
            const data = await strapi.entityService.findMany('api::customer.customer', {
                populate : ["promotionScheme"]
            });
            ctx.body = { data };
        } catch(err) {
            ctx.body = err;
        }
    }
}));
