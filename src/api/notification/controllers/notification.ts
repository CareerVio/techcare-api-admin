
import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::notification.notification' , ({ strapi }) => ({
    async create(ctx){
        super.create(ctx);
        console.log("Create");
    },
    async find(ctx){
        try {
            const { id } = ctx.state.user;
            const { fetchOption } = ctx.params;
            
            if(fetchOption == "long-polling"){
              await strapi.service('api::long-polling.long-polling').subscribe( id , '/notifications');
            }

            const filters = { users : id };
            const sort = { id : 'desc'};
            const data = await strapi.entityService.findMany('api::notification.notification', { filters , sort });
            ctx.body = { data };
        } catch (err) {
            return ctx.badRequest(err);
        }
    },
    

    
}));
