/**
 * repair-order controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::repair-order.repair-order', ({ strapi }) => ({
    async find(ctx) {
        try {
            const data = await strapi.entityService.findMany('api::repair-order.repair-order', {
                
            });
            ctx.body = { data };
        } catch(err) {
            ctx.body = err;
        }
    }
}));
