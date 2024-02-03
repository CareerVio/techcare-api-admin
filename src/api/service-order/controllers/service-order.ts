/**
 * service-order controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::service-order.service-order', ({ strapi }) => ({
    async find(ctx) {
        try {
            const data = await strapi.entityService.findMany('api::service-order.service-order', {
                
            });
            ctx.body = { data };
        } catch(err) {
            ctx.body = err;
        }
    }
}));
