/**
 * store-item controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::store-item.store-item', ({ strapi }) => ({
    async getAllStoreItems(ctx){
        try {
            const { store_id } = ctx.params;
            const response = await strapi.entityService.findMany('api::store-item.store-item',{
                filters : {store_id : store_id}
            });
            ctx.body = response;
        }catch (err){
            ctx.body = err;
        }
    } ,
    async getStoreItem(ctx){
        try {
            const { store_id,item_id } = ctx.params;
            const response = await strapi.entityService.findOne('api::store-item.store-item',item_id,{
                filters : {store_id : store_id}
            });
            ctx.body = response;
        }catch (err){
            ctx.body = err;
        }
    },
    async updateStoreItem(ctx){
        try {
            const { store_id,item_id } = ctx.params;
            const { store_item_id,category_id,name,image_url,price,description,consumption_instruction,caution,store_order_details } = ctx.request.body;
            const response = await strapi.entityService.update('api::store-item.store-item', item_id , { data:{
                store_item_id,
                store_id:store_id,
                category_id,
                name,
                image_url,
                price,
                description,
                consumption_instruction,
                caution,
                store_order_details
            },
            filters : {store_id:store_id}
        });
            ctx.body = response;
        }catch (err){
            ctx.body = err;
        }
    },
    async createStoreItem(ctx){
        try {
            const { store_id } = ctx.params;
            const { store_item_id,category_id,name,image_url,price,description,consumption_instruction,caution,store_order_details } = ctx.request.body;
            const response = await strapi.entityService.create('api::store-item.store-item', { data:{
                store_item_id,
                store_id:store_id,
                category_id,
                name,
                image_url,
                price,
                description,
                consumption_instruction,
                caution,
                store_order_details
            },
            filters : {store_id:store_id}
        });
            ctx.body = response;
        }catch (err){
            ctx.body = err;
        }
    },
    async deleteStoreItem(ctx){
        try {
            const { store_id,item_id } = ctx.params;
            const response = await strapi.entityService.delete('api::store-item.store-item', item_id,{
                filters: {store_id:store_id}
            });
            ctx.body = {message: 'Store item deleted successfully'};
        }catch (err){
            ctx.body = err;
        }
    },
}));
