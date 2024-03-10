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
            const { store_file_id,store_id,file_type,file_path,description,uploaded_at } = ctx.request.body;
            const response = await strapi.entityService.update('api::store-file.store-file', id , { data:{
                store_file_id,
                store_id,
                file_type,
                file_path,
                description,
                uploaded_at:Date.now()
            }});
            ctx.body = response;
        }catch (err){
            ctx.body = err;
        }
    },
    async createStoreFiles(ctx){
        try {
            const { store_file_id,store_id,file_type,file_path,description,uploaded_at } = ctx.request.body;
            const response = await strapi.entityService.create('api::store-file.store-file', { data:{
                store_file_id,
                store_id,
                file_type,
                file_path,
                description,
                uploaded_at:Date.now()
            }});
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
