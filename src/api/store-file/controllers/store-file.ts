/**
 * store-file controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::store-file.store-file', ({ strapi }) => ({
    async getStoreFiles(ctx){
        try {
            const response = await strapi.entityService.findMany('api::store-file.store-file',{
            });
            ctx.body = response;
        }catch (err){
            ctx.body = err;
        }
    },
    async updateStoreFiles(ctx){
        try {
            const { id } = ctx.params;
            const { data } = ctx.request.body;
            const response = await strapi.entityService.update('api::store-file.store-file', id , { data });
            ctx.body = response;
        }catch (err){
            ctx.body = err;
        }
    },
    async createStoreFiles(ctx){
        try {
            const { data } = ctx.request.body;
            const response = await strapi.entityService.create('api::store-file.store-file', { data });
            ctx.body = response;
        }catch (err){
            ctx.body = err;
        }
    },
    async deleteStoreFiles(ctx){
        try {
            const { id } = ctx.params;
            const response = await strapi.entityService.delete('api::store-file.store-file', id);
            ctx.body = response;
        }catch (err){
            ctx.body = err;
        }
    },
}));
