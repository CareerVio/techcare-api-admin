/**
 * store controller
 */
import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::store.store', ({ strapi }) => ({
    async getStores(ctx){
        try {
            const response = await strapi.entityService.findMany('api::store.store',{
            });
            ctx.body = response;
        }catch (err){
            ctx.body = err;
        }
    },
    async getStore(ctx){
        try {
            const { id } = ctx.params;
            const response = await strapi.entityService.findOne('api::store.store',id,{
            });
            ctx.body = response;
        }catch (err){
            ctx.body = err;
        }
    },
    async updateStore(ctx){
        try {
            const { id } = ctx.params;
            const { store_id, owner_id, name,address,description,contact_info,review,status,store_items,store_files,store_hours,store_orders } = ctx.request.body;
            const response = await strapi.entityService.update('api::store.store', id , { data:{
                store_id,
                owner_id,
                name,
                address,
                description,
                contact_info,
                review,
                status,
                store_files,
                store_hours,
            }});
            ctx.body = response;
        }catch (err){
            ctx.body = err;
        }
    },
    async createStore(ctx){
        try {
            const { store_id, owner_id, name,address,description,contact_info,review,status,store_items,store_files,store_hours,store_orders } = ctx.request.body;
            const response = await strapi.entityService.create('api::store.store', { data:{
                store_id,
                owner_id,
                name,
                address,
                description,
                contact_info,
                review,
                status,
                store_files,
                store_hours,
            }});
            ctx.body = response;
        }catch (err){
            ctx.body = err;
        }
    },
    async deleteStore(ctx){
        try {
            const { id } = ctx.params;
            const response = await strapi.entityService.delete('api::store.store', id);
            ctx.body = response;
        }catch (err){
            ctx.body = err;
        }
    },
}));
