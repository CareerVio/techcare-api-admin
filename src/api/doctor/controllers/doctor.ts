'use strict';

/**
 * doctor controller
 */

import { factories } from '@strapi/strapi'; 

export default factories.createCoreController('api::doctor.doctor', ({ strapi }) => ({
    async create(ctx) {
        try {
          
          const { id } = ctx.state.user;
          let { data } = ctx.request.body;

          let [ medical_facility ] = await strapi.entityService.findMany('api::medical-facility.medical-facility', {
            filters : { admin : id },
          });
          
          data["medicalFacility"] = medical_facility.id;

          const response = await strapi.entityService.create('api::doctor.doctor',{ data });
          
          ctx.body = response;
  

        } catch (err) {
          console.log(err);
          ctx.badRequest(err);
        }
    },
    async getDoctorsByMedicalFacility(ctx){
        try {
            const { id } = ctx.state.user;
            const { fetchOption } = ctx.params;

            let [ medical_facility ] = await strapi.entityService.findMany('api::medical-facility.medical-facility', {
                filters : { admin : id },
            });
            const filters = { medicalFacility: medical_facility.id };
            const sort = { id : 'desc'};
            const data = await strapi.entityService.findMany('api::doctor.doctor', { filters , sort });
            ctx.body = { data };
        } catch (err) {
            return ctx.badRequest(err);
        }
    }
}));
