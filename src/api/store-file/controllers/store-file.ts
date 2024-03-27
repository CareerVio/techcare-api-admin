/**
 * store-file controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::store-file.store-file', ({ strapi }) => ({
    async getStoreFiles(ctx){
        try {
            const { store_id } = ctx.params;
            const response = await strapi.entityService.findMany('api::store-file.store-file',{
                filters : {store_id : store_id}
            });
            ctx.body = response;
        }catch (err){
            ctx.body = err;
        }
    },
    async updateStoreFiles(ctx){
        try {
            const { store_id,file_id } = ctx.params;
            const { store_file_id,file_type,file_path,description,uploaded_at } = ctx.request.body;
            const response = await strapi.entityService.update('api::store-file.store-file', file_id, { data:{
                store_file_id,
                store_id : store_id,
                file_type,
                file_path,
                description,
                uploaded_at:Date.now()
            },
            filters : {store_id:store_id}
            });
            ctx.body = response;
        }catch (err){
            ctx.body = err;
        }
    },
    async createStoreFiles(ctx){
        try {
            const { store_id } = ctx.params;
            const { store_file_id,file_type,file_path,description,uploaded_at } = ctx.request.body;
            const response = await strapi.entityService.create('api::store-file.store-file', { data:{
                store_file_id,
                store_id:store_id,
                file_type,
                file_path,
                description,
                uploaded_at:Date.now()
            },
            filters : {store_id:store_id}
        });
            ctx.body = response;
        }catch (err){
            ctx.body = err;
        }
    },
    async deleteStoreFiles(ctx){
        try {
            const { store_id,file_id } = ctx.params;
            const response = await strapi.entityService.delete('api::store-file.store-file', file_id,{
                filters: {store_id:store_id}
            });
            ctx.body = {message: 'File deleted successfully'};
        }catch (err){
            ctx.body = err;
        }
    },
}));
