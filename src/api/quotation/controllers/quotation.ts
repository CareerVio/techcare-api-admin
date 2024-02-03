/**
 * quotation controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::quotation.quotation', ({ strapi }) => ({
    async find(ctx) {
        try {
            const data = await strapi.entityService.findMany('api::quotation.quotation', {
                populate : ["quotationDetails", "sale"]
            });
            ctx.body = { data };
        } catch(err) {
            ctx.body = err;
        }
    }
}));
