/**
 * landing-page-promo controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::landing-page-promo.landing-page-promo', ({ strapi }) => ({
    async find(ctx){
        try {
            const data = await strapi.entityService.findMany('api::landing-page-promo.landing-page-promo', {
                populate : ["promo"],
            });
            ctx.body = { data };
        } catch (err) {
            return ctx.badRequest(err);
        }
    }
}));
