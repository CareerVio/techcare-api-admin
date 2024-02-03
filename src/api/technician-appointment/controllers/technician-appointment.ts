/**
 * technician-appointment controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::technician-appointment.technician-appointment', ({ strapi }) => ({
    async find(ctx) {
        try {
            const data = await strapi.entityService.findMany('api::technician-appointment.technician-appointment', {
                populate : ["equipment"]
            });
            ctx.body = { data };
        } catch(err) {
            ctx.body = err;
        }
    }
}));
