/**
 * supplier-receive controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::supplier-receive.supplier-receive', ({ strapi }) => ({
    async find(ctx) {
        try {
            const data = await strapi.entityService.findMany('api::supplier-receive.supplier-receive', {
                populate : ["file"]
            });
            ctx.body = { data };
        } catch(err) {
            ctx.body = err;
        }
    }
}));
