/**
 * store-order controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::store-order.store-order', ({ strapi }) => ({
    async getStoreOrder(ctx){
        try {
            const { store_id,order_id } = ctx.params;
            const response = await strapi.entityService.findOne('api::store-order.store-order',order_id,{
                filters : {store_id : store_id}
            });
            ctx.body = response;
        }catch (err){
            ctx.body = err;
        }
    },
    async getAllStoreOrders(ctx){
        try {
            const { store_id } = ctx.params;
            const response = await strapi.entityService.findMany('api::store-order.store-order',{
                filters : {store_id : store_id}
            });
            ctx.body = response;
        }catch (err){
            ctx.body = err;
        }
    },
    async updateStoreOrder(ctx){
        try {
            const { store_id,order_id } = ctx.params;
            const { store_order_id,customer_id,status,approved,uploaded_at,store_order_details } = ctx.request.body;
            const response = await strapi.entityService.update('api::store-order.store-order', order_id , { data:{
                store_order_id,
                store_id:store_id,
                customer_id,
                status,
                approved,
                uploaded_at:Date.now(),
                store_order_details
            },
            filters : {store_id:store_id}
        });
            ctx.body = response;
        }catch (err){
            ctx.body = err;
        }
    },
    async createStoreOrder(ctx){
        try {
            const { store_id } = ctx.params;
            const { store_order_id,customer_id,status,approved,uploaded_at,store_order_details } = ctx.request.body;
            const response = await strapi.entityService.create('api::store-order.store-order', { data:{
                store_order_id,
                store_id:store_id,
                customer_id,
                status,
                approved,
                uploaded_at:Date.now(),
                store_order_details
            },
            filters : {store_id:store_id}
        });
            ctx.body = response;
        }catch (err){
            ctx.body = err;
        }
    },
    async deleteStoreOrder(ctx){
        try {
            const { store_id,order_id } = ctx.params;
            const response = await strapi.entityService.delete('api::store-order.store-order', order_id,{
                filters: {store_id:store_id}
            });
            ctx.body = {message: 'Store Order deleted successfully'};
        }catch (err){
            ctx.body = err;
        }
    },
}));
