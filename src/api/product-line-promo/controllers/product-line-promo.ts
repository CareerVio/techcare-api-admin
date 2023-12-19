/**
 * product-line-promo controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::product-line-promo.product-line-promo', ({ strapi }) => ({
    async find(ctx){
        try {
            const data = await strapi.entityService.findMany('api::product-line-promo.product-line-promo', {
                populate : ["promo"],
            });
            ctx.body = { data };
        } catch (err) {
            return ctx.badRequest(err);
        }
    }
}));
