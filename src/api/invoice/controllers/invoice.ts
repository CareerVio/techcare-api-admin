/**
 * invoice controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::invoice.invoice', ({ strapi }) => ({
    async findOne(ctx) {
        try {
            const { id } = ctx.params;
            const data = await strapi.entityService.findOne('api::invoice.invoice',id, {
                populate : ["invoiceDetails"]
            });
            ctx.body = { data };
        } catch(err) {
            ctx.body = err;
        }
    },
}));
