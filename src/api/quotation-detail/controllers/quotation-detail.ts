/**
 * quotation-detail controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::quotation-detail.quotation-detail', ({ strapi }) => ({
    async find(ctx) {
        try {
            const data = await strapi.entityService.findMany('api::quotation-detail.quotation-detail', {
                
            });
            ctx.body = { data };
        } catch(err) {
            ctx.body = err;
        }
    }
}));
