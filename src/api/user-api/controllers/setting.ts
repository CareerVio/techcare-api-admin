
export default {
    async getSetting(ctx) {
      try {
        const header = ctx.request.header;
        const data = ctx.request.body;
        const { id } = ctx.state.user;
        console.log(id);
        const response = await strapi.entityService.findOne('plugin::users-permissions.user', id , {
          fields : ['isEmailNotification' , 'isPushNotification'],
          populate: ['language']
        });
        ctx.body = response;
      } catch (err) {
        ctx.body = err;
      }
    },
    async updateSetting(ctx) {
        try {
          const header = ctx.request.header;
          const { data } = ctx.request.body;
          const { id } = ctx.state.user;
          
          const response = await strapi.entityService.update('plugin::users-permissions.user', id , { data });
          ctx.body = data;
        } catch (err) {
          ctx.body = err;
        }
    },
};
