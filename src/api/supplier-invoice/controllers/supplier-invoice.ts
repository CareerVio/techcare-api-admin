/**
 * supplier-invoice controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::supplier-invoice.supplier-invoice', ({ strapi }) => ({
    async find(ctx) {
        try {
            const data = await strapi.entityService.findMany('api::supplier-invoice.supplier-invoice', {
                populate : ["file"]
            });
            ctx.body = { data };
        } catch(err) {
            ctx.body = err;
        }
    }
}));
