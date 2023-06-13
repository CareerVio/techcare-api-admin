
import { factories } from '@strapi/strapi'; 
import availableTime from '../../available-time/controllers/available-time';

export default factories.createCoreController('api::appointment.appointment' , ({ strapi }) => ({
    async create(ctx){
        const { id } = ctx.state.user;
        const { data } = ctx.request.body;

        data["user"] = id;
        await strapi.entityService.create('api::appointment.appointment' , { data });

        ctx.body = data;
    },
    async getAppointments(ctx){
        try {
            const { id } = ctx.state.user;
            const { searchCriteria } = JSON.parse(ctx.params.searchCriteria);
            const { date } = searchCriteria
            const get_doctor = async (doctor_id : string) => {
                return await strapi.entityService.findOne('api::doctor.doctor', doctor_id , { populate : 'profileImage' });
            }

            const filters = { user : id, date : date };
            const sort = { id : 'desc'};
            const populate = ['doctor','medicalFacility','medicalFacilityImage'];
            const appointments = await strapi.entityService.findMany('api::appointment.appointment', { filters , populate , sort });

            for ( let appointment of appointments){
                appointment.doctor = await get_doctor(appointment.doctor.id);
            };

            console.log(date);
            
            ctx.body =  { data : appointments };
       
        } catch (err) {
            return ctx.badRequest(err);
        }
    },
    async getDoctors(ctx){
        try {
            const { id } = ctx.state.user;
            const { searchCriteria } = JSON.parse(ctx.params.searchCriteria);
            

            const { date } = searchCriteria

            const get_available_times = async (doctor_id : string) => {
                const filters = {
                    doctor : doctor_id
                }
                return await strapi.entityService.findMany('api::available-time.available-time', { filters });
            }
            const get_questionnaire = async () => {
                console.log(id);
                const [ questionnaire ] = await strapi.entityService.findMany('api::questionnaire.questionnaire', {
                    
                    filters : { user : id },
                    populate : ['mostVisitHospital']
                });
                return questionnaire;
            };
            const questionnaire = await get_questionnaire();

            const filters = questionnaire.mostVisitHospital ? {
                medicalFacility : questionnaire.mostVisitHospital
            } : {};

            const doctors = await strapi.entityService.findMany('api::doctor.doctor' , { filters , populate : ['profileImage','medicalFacility'] });
            for (let doctor of doctors){
                doctor["availableTime"] = await get_available_times(doctor.id);
            }
            ctx.body = { data : doctors };
       
        } catch (err) {
            return ctx.badRequest(err);
        }
    },
    async getAppointmentsByMedicalFacility(ctx){
        const { id } = ctx.state.user;

        let [ medical_facility ] = await strapi.entityService.findMany('api::medical-facility.medical-facility', {
            filters : { admin : id },
        });
        const filters = { medicalFacility: medical_facility.id };
        const sort = { id : 'desc'};
        const data = await strapi.entityService.findMany('api::appointment.appointment', { filters , sort });
        ctx.body = { data };
    }
}));
