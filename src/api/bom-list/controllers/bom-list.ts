/**
 * bom-list controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::bom-list.bom-list', ({ strapi }) => ({
    async find(ctx) {
        try {
            const data = await strapi.entityService.findMany('api::bom-list.bom-list', {
                
            });
            ctx.body = { data };
        } catch(err) {
            ctx.body = err;
        }
    }
}));
