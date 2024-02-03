/**
 * supplier controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::supplier.supplier', ({ strapi }) => ({
    async find(ctx) {
        try {
            const data = await strapi.entityService.findMany('api::supplier.supplier', {
                populate : ["kycFile"]
            });
            ctx.body = { data };
        } catch(err) {
            ctx.body = err;
        }
    }
}));
