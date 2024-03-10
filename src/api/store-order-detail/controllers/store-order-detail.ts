/**
 * store-order-detail controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::store-order-detail.store-order-detail', ({ strapi }) => ({
    async getStoreOrderDetail(ctx){
        try {
            const { id } = ctx.params;
            const response = await strapi.entityService.findOne('api::store-order-detail.store-order-detail',id,{
            });
            ctx.body = response;
        }catch (err){
            ctx.body = err;
        }
    },
    async updateStoreOrderDetail(ctx){
        try {
            const { id } = ctx.params;
            const { store_order_detail_id,order_id,item_id,quantity,price } = ctx.request.body;
            const response = await strapi.entityService.update('api::store-order-detail.store-order-detail',{ data:{
                store_order_detail_id,
                order_id,
                item_id,
                quantity,
                price
            }});
            ctx.body = response;
        }catch (err){
            ctx.body = err;
        }
    },
}));
