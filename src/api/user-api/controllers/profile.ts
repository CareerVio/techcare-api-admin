
export default {
    async getProfile(ctx) {
      try {
        console.log(ctx.params);
        const { id } = !ctx.params.id ? ctx.state.user : ctx.params;
        
        const questionnaire_field = ['weight' , 'height' , 'bloodGroup'];
        
        const response_user_permission = await strapi.entityService.findOne('plugin::users-permissions.user', id , {
          populate : ['profileImage' , 'country' , 'province' ]
        });
        console.log(response_user_permission);
        //left join
        const [ response_questionnaire ] = await strapi.entityService.findMany('api::questionnaire.questionnaire',{
          fields : questionnaire_field,
          filters : { user : id }
        });
        console.log(response_questionnaire);

        ctx.body = Object.assign(response_questionnaire , response_user_permission);

      }catch (err){
        console.log(err);
        ctx.body = err;
      }
    },
    async getBannerInfo(ctx) {
      try {
        const { id } = ctx.state.user;
        const response_user_permission = await strapi.entityService.findOne('plugin::users-permissions.user', id,{
          fields : ['firstName']
        });
        
        //left join
        const [ response_questionnaire ] = await strapi.entityService.findMany('api::questionnaire.questionnaire',{
          fields : ['careTakerFirstName'],
          filters : { user : id }
        });
        console.log(response_questionnaire);
        ctx.body = Object.assign(response_questionnaire , response_user_permission);

      }catch (err){
        console.log(err);
        ctx.body = err;
      }
    },
    async uploadProfilePicture(ctx) {
      try {
        const { data } = ctx.request.body;
        const { id } = ctx.state.user;
        const response = await strapi.entityService.update('plugin::users-permissions.user', id , { data });
        ctx.body = data;
      } catch (err) {
        ctx.body = err;
      }
  },
    async updateProfile(ctx) {
        try {
          const { data } = ctx.request.body;
          const { id } = ctx.state.user;
          const response = await strapi.entityService.update('plugin::users-permissions.user', id , { data });
          ctx.body = data;
        } catch (err) {
          if(err.name == "ValidationError"){
            return ctx.badRequest(err.name,err);
          }
        }
    },
};
