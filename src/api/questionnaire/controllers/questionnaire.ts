/**
 * questionnaire controller
 */

import { factories } from '@strapi/strapi'; 

export default factories.createCoreController('api::questionnaire.questionnaire',({ strapi }) => ({
    async getQuestionnaire(ctx) {
        try {
          const { userid } = ctx.params
          const { id } = ctx.state.user ? ctx.state.user : Object.create(null);
          const user = userid ? userid : id
          let [ data ] = await strapi.entityService.findMany('api::questionnaire.questionnaire', {
            filters : { user },
            sort : { id : 'desc' },
            populate : ["mostVisitHospital", "preferredDoctor", "insuranceCompany"]
          });
          data.medicine = JSON.parse(data.medicine);
          ctx.body = data;
        } catch (err) {
          ctx.body = err;
        }
    },
    async createQuestionnaire(ctx) {
        try {
          const { id } = ctx.state.user;
          let { data } = ctx.request.body;
          
          // Add User Id
          data["user"] = id

          console.log (data);

          const create_questionnaire_response = await strapi.entityService.create('api::questionnaire.questionnaire',{ data });
          ctx.body = create_questionnaire_response;
        } catch (err) {
          if(err.name == "ValidationError"){
            return ctx.badRequest(err.name,err);
          }
          ctx.body = err;
        }
    },
}));
