/**
 * A set of functions called "actions" for `medical-facility-admin`
 */

export default {
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
        const populate = ['diseases','medicalFacility','user','doctor'];
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
  async getAppointmentsByMedicalFacility(ctx){
    const { id } = ctx.state.user;

    let [ medical_facility ] = await strapi.entityService.findMany('api::medical-facility.medical-facility', {
        filters : { admin : id },
    });
    
    const populate = ['doctor','user'];
    const filters = { medicalFacility: medical_facility.id };
    const sort = { id : 'desc'};
    const data = await strapi.entityService.findMany('api::appointment.appointment', { filters , sort , populate });
    ctx.body = { data };
  },
  async getDoctorsByMedicalFacility(ctx){
    try {
        const { id } = ctx.state.user;
        const { fetchOption } = ctx.params;

        let [ medical_facility ] = await strapi.entityService.findMany('api::medical-facility.medical-facility', {
            filters : { admin : id },
        });
        const filters = { medicalFacility: medical_facility.id };
        const populate = ["profileImage","medicalFacility","department"];
        const sort = { id : 'desc'};
        const data = await strapi.entityService.findMany('api::doctor.doctor', { filters , sort , populate});
        ctx.body = { data };
    } catch (err) {
        return ctx.badRequest(err);
    }
  },
  async getPatientsByMedicalFacility(ctx){
    
    //This Controller will be modified soon.

    try {
        const { id } = ctx.state.user;
        //const { fetchOption } = ctx.params;

        let [ medical_facility ] = await strapi.entityService.findMany('api::medical-facility.medical-facility', {
            filters : { admin : id },
        });
        //const filters = { medicalFacility: medical_facility.id };
        
        const data = await strapi.entityService.findMany('plugin::users-permissions.user', {
          populate : ['profileImage' , 'country' , 'province' ]
        });
        ctx.body = { data };

    } catch (err) {
        return ctx.badRequest(err);
    }
  },
  async createTreatmentRecordByMedicalFacility(ctx){
    try {
      const { id } = ctx.state.user;
      const { data } = ctx.request.body;

      let [ medical_facility ] = await strapi.entityService.findMany('api::medical-facility.medical-facility', {
        filters : { admin : id },
      });

      data["medicalFacility"] = medical_facility.id;
      await strapi.entityService.create('api::treatment-record.treatment-record' , { data });

      ctx.body = data;

    } catch (err) {
        return ctx.badRequest(err);
    }
  },
  async createDoctorByMedicalFacility(ctx){
    try {
      const { id } = ctx.state.user;
      const { data } = ctx.request.body;

      let [ medical_facility ] = await strapi.entityService.findMany('api::medical-facility.medical-facility', {
        filters : { admin : id },
      });

      data["medicalFacility"] = medical_facility.id;

      await strapi.entityService.create('api::doctor.doctor' , { data });

      ctx.body = data;

    } catch (err) {
        return ctx.badRequest(err);
    }
  },
  async createAppointmentByMedicalFacility(ctx){
    try {
      const { id } = ctx.state.user;
      const { data } = ctx.request.body;

      let [ medical_facility ] = await strapi.entityService.findMany('api::medical-facility.medical-facility', {
        filters : { admin : id },
      });

      data["medicalFacility"] = medical_facility.id;
      
      await strapi.entityService.create('api::appointment.appointment' , { data });

      ctx.body = data;

    } catch (err) {
      return ctx.badRequest(err);
    }
  },
};
