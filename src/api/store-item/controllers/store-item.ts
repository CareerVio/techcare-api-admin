/**
 * store-item controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::store-item.store-item', ({ strapi }) => ({
    async getAllStoreItems(ctx){
        try {
            const response = await strapi.entityService.findMany('api::store-item.store-item',{
            });
            ctx.body = response;
        }catch (err){
            ctx.body = err;
        }
    } ,
    async getStoreItem(ctx){
        try {
            const { id } = ctx.params;
            const response = await strapi.entityService.findOne('api::store-item.store-item',id,{
            });
            ctx.body = response;
        }catch (err){
            ctx.body = err;
        }
    },
    async updateStoreItem(ctx){
        try {
            const { id } = ctx.params;
            const { data } = ctx.request.body;
            const response = await strapi.entityService.update('api::store-item.store-item', id , { data });
            ctx.body = response;
        }catch (err){
            ctx.body = err;
        }
    },
    async createStoreItem(ctx){
        try {
            const { data } = ctx.request.body;
            const response = await strapi.entityService.create('api::store-item.store-item', { data });
            ctx.body = response;
        }catch (err){
            ctx.body = err;
        }
    },
    async deleteStoreItem(ctx){
        try {
            const { id } = ctx.params;
            const response = await strapi.entityService.delete('api::store-item.store-item', id);
            ctx.body = response;
        }catch (err){
            ctx.body = err;
        }
    },
}));
