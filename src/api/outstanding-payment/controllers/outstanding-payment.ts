/**
 * outstanding-payment controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::outstanding-payment.outstanding-payment', ({ strapi }) => ({
    async find(ctx) {
        try {
            const data = await strapi.entityService.findMany('api::outstanding-payment.outstanding-payment', {
                
            });
            ctx.body = { data };
        } catch(err) {
            ctx.body = err;
        }
    }
}));
