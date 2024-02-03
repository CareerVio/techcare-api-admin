/**
 * maintenance controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::maintenance.maintenance', ({ strapi }) => ({
    async find(ctx) {
        try {
            const data = await strapi.entityService.findMany('api::maintenance.maintenance', {
                populate : ["equipment", "technicianAppointment"]
            });
            ctx.body = { data };
        } catch(err) {
            ctx.body = err;
        }
    }
}));
