/**
 * my-outstanding-payment controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::my-outstanding-payment.my-outstanding-payment', ({ strapi }) => ({
    async find(ctx) {
        try {
            const data = await strapi.entityService.findMany('api::my-outstanding-payment.my-outstanding-payment', {
                
            });
            ctx.body = { data };
        } catch(err) {
            ctx.body = err;
        }
    }
}));
