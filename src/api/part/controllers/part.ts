/**
 * part controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::part.part', ({ strapi }) => ({
    async find(ctx) {
        try {
            const data = await strapi.entityService.findMany('api::part.part', {
                
            });
            ctx.body = { data };
        } catch(err) {
            ctx.body = err;
        }
    }
}));
