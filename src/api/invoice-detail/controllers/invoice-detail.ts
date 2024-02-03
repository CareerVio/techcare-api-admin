/**
 * invoice-detail controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::invoice-detail.invoice-detail', ({ strapi }) => ({
    async find(ctx) {
        try {
            const data = await strapi.entityService.findMany('api::invoice-detail.invoice-detail', {
                populate : ["invoice"]
            });
            ctx.body = { data };
        } catch(err) {
            ctx.body = err;
        }
    }
}));
