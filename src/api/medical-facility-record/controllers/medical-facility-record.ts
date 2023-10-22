import medicalFacility from "../../medical-facility/services/medical-facility";
import treatmentRecord from "../../treatment-record/controllers/treatment-record";
import treatment from "../../treatment/controllers/treatment";

export default {
  async getMedicalFacilities(ctx) {
    try {
      const { id } = ctx.state.user;

      ctx.body = { data : [] };

      //SELECT
      
      const populate = ['appointment'];
      const sort = { id : 'desc'};
      const treatmentRecords = await strapi.entityService.findMany('api::treatment-record.treatment-record',{ populate , sort });

      //LEFT JOIN
      const get_appointment = async (appointment_id : string) => {
        const populate = ['diseases','medicalFacility'];
        const filters = {user : id};
        return await strapi.entityService.findOne('api::appointment.appointment', appointment_id, { filters , populate });
      }
      for (let treatmentRecord of treatmentRecords){
        if(!treatmentRecord.appointment.id)
          continue
        
        const appointment = await get_appointment(treatmentRecord.appointment.id);
        treatmentRecord.appointment = appointment;
      }

      //LEFT JOIN 
      const get_medicalFacility = async (medicalFacility_id : string) => {
        const populate = ['medicalFacilityImage'];
        return await strapi.entityService.findOne('api::medical-facility.medical-facility', medicalFacility_id, { populate });
      }
      for (let treatmentRecord of treatmentRecords){

        if(!treatmentRecord.appointment.medicalFacility)
          continue

        const medicalFacility = await get_medicalFacility(treatmentRecord.appointment.medicalFacility.id);
        treatmentRecord.appointment.medicalFacility = medicalFacility;
        
      }
      //WHERE
      
      for (let treatmentRecord of treatmentRecords){
        if(!(!treatmentRecord.appointment.medicalFacility) && !(treatmentRecord.appointment.medicalFacility in ctx.body.data)){
          ctx.body.data.push(treatmentRecord.appointment.medicalFacility);
        }
      }
    } catch (err) {
      return ctx.badRequest(err);
    }
  },
  async getTreatmentRecords(ctx) {
    try {
      const { medicalFacility_id } = ctx.params;
      const { id } = ctx.state.user;

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
          user : id , 
          medicalFacility : medicalFacility_id
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
  async getTreatmentRecord(ctx) {
    try {
      const { treatmentRecord_id } = ctx.params;

      //SELECT
      const get_treatmentRecord = async (treatmentRecord_id :string) => {
        const populate = 'appointment'
        return await strapi.entityService.findOne('api::treatment-record.treatment-record', treatmentRecord_id , { populate });
      };
      const treatmentRecord = await get_treatmentRecord(treatmentRecord_id);

      //LEFT JOIN
      const get_appointment = async (appointment_id:string) => {
        const populate = ['medicalFacility','doctor']
        return await strapi.entityService.findOne('api::appointment.appointment', appointment_id , { populate });
      }
      const appointment = await get_appointment(treatmentRecord.appointment.id);
      
      //LEFT JOIN
      const get_doctor = async (doctor_id:string) => {
        const populate = 'profileImage'
        return await strapi.entityService.findOne('api::doctor.doctor', doctor_id , { populate });
      }
      
      const doctor = await get_doctor(appointment.doctor.id);
      const medicalFacility = appointment.medicalFacility;

      ctx.body = Object.assign(Object.assign(treatmentRecord , {medicalFacility : medicalFacility}), {doctor : doctor});
    } catch (err) {
      return ctx.badRequest(err);
    }
  },
  async updateRequestForRecord(ctx){
    try {
      const { treatmentRecord_id } = ctx.params;
      const data = {
        isRequestForRecord : true
      };
      
      await strapi.service('api::treatment-record.treatment-record').update(treatmentRecord_id , { data });

      ctx.body = data;
    } catch (err) {
      return ctx.badRequest(err);
    }
  }
};
