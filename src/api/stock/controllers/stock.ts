/**
 * stock controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::stock.stock', ({ strapi }) => ({
    async find(ctx) {
        try {
            const data = await strapi.entityService.findMany('api::stock.stock', {
                populate : ["barCode"]
            });
            ctx.body = { data };
        } catch(err) {
            ctx.body = err;
        }
    }
}));
