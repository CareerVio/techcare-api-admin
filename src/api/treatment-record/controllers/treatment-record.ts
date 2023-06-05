/**
 * treatment-record controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::treatment-record.treatment-record', ({strapi})=>({
    async getTreatmentRecordsByMedicalFacility(ctx) {
        try {
          const { id } = ctx.state.user;
    
        let [ medicalFacility ] = await strapi.entityService.findMany('api::medical-facility.medical-facility', {
            filters : { admin : id },
        });
          ctx.body = { data : [] };
          
          //SELECT
          
          const fields = ['id'];
          const populate = ['appointment'];
          const sort = { id : 'desc'};
          const treatmentRecords = await strapi.entityService.findMany('api::treatment-record.treatment-record',{ fields , populate , sort });
    
          //LEFT JOIN
          const get_appointment = async (appointment_id : string) => {
            const populate = ['diseases','medicalFacility'];
            const filters = {
              medicalFacility : medicalFacility.id
            };
            return await strapi.entityService.findOne('api::appointment.appointment', appointment_id, { filters , populate });
          }
    
          for (let treatmentRecord of treatmentRecords){
            const appointment = await get_appointment(treatmentRecord.appointment.id);
            treatmentRecord.appointment = appointment;
          }
    
          //WHERE
          
          for (let treatmentRecord of treatmentRecords){
            if(!(!treatmentRecord.appointment) && !(treatmentRecord in ctx.body.data)){
              ctx.body.data.push(treatmentRecord);
            }
          }
    
        } catch (err) {
          return ctx.badRequest(err);
        }
    },
}));
