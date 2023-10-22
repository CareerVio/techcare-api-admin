/**
 * after-sale-promo controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::after-sale-promo.after-sale-promo', ({ strapi }) => ({
    async find(ctx){
        try {
            const data = await strapi.entityService.findMany('api::after-sale-promo.after-sale-promo', {
                populate : ["promo"],
            });
            ctx.body = { data };
        } catch (err) {
            return ctx.badRequest(err);
        }
    }
}));