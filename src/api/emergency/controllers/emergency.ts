/**
 * emergency controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::emergency.emergency' , ({ strapi }) => ({
    async find(ctx){
        try {
            const { id } = ctx.state.user;
            const { fetchOption } = ctx.params;
            const filters = {
                patient : id
            };
            const sort = { id : 'desc'};
            if(fetchOption == "long-polling"){
                await strapi.service('api::long-polling.long-polling').subscribe( id , '/emergencies');
            }

            const populate = ['patient','medicalFacility'];
            const emergencies = await strapi.entityService.findMany('api::emergency.emergency', { filters , populate , sort });
            ctx.body = { data : emergencies };
          } catch (err) {
            return ctx.badRequest(err);
          }
    },
    async create(ctx){
        try {
            const { id } = ctx.state.user;
            const { data } = ctx.request.body;
            
            data["patient"] = id;

            await strapi.entityService.create('api::emergency.emergency', { data });
            ctx.body = data;

            //trigger event
            await strapi.service('api::long-polling.long-polling').publish( id , '/emergencies' , {} );
        } catch (err) {
            return ctx.badRequest(err);
        }
    },
    async getEmergencyAlert(ctx){
        try {
            const { id } = ctx.state.user;
            const { fetchOption } = ctx.params;
        
            if(fetchOption == "long-polling"){
                const response = await strapi.service('api::long-polling.long-polling').subscribe( id , '/emergency');
                ctx.body = response;
            }
          } catch (err) {
            return ctx.badRequest(err);
          }
    },
}));
