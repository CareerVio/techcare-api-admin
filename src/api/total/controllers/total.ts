/**
 * total controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::total.total', ({ strapi }) => ({
    async find(ctx) {
        try {
            const data = await strapi.entityService.findMany('api::total.total', {
                populate : ["formTotal"]
            });
            ctx.body = { data };
        } catch(err) {
            ctx.body = err;
        }
    }
}));
