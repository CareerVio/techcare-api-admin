/**
 * job-order controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::job-order.job-order', ({ strapi }) => ({
    async find(ctx) {
        try {
            const data = await strapi.entityService.findMany('api::job-order.job-order', {
                populate: ['device', 'user']
            });
            ctx.body = { data };
        } catch(err) {
            ctx.body = err;
        }
    }
}));
