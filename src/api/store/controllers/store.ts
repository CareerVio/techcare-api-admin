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
            const { data } = ctx.request.body;
            const response = await strapi.entityService.update('api::store.store', id , { data });
            ctx.body = response;
        }catch (err){
            ctx.body = err;
        }
    },
    async createStore(ctx){
        try {
            const { data } = ctx.request.body;
            const response = await strapi.entityService.create('api::store.store', { data });
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
