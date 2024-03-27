/**
 * stock controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::stock.stock', ({ strapi }) => ({
    async find(ctx) {
        const { type } = ctx.params;
        console.log(type)
        try {
            const data = await strapi.entityService.findMany('api::stock.stock', {
                populate : ["barCode"],
                filters : { type }
            });
            ctx.body = { data };
        } catch(err) {
            ctx.body = err;
        }
    }
}));
