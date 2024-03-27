/**
 * store-item-categorie controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::store-item-categorie.store-item-categorie', ({ strapi }) => ({
    async getCategory(ctx){
        try {
            const { category_id,store_id } = ctx.params;
            const response = await strapi.entityService.findOne('api::store-item-categorie.store-item-categorie',category_id,{
                filters : {store_id : store_id}
            });
            ctx.body = response;
        }catch (err){
            ctx.body = err;
        }
    },
    async getAllCategory(ctx){
        try {
            const { store_id } = ctx.params;
            const response = await strapi.entityService.findMany('api::store-item-categorie.store-item-categorie',{
                filters : {store_id : store_id}
            });
            ctx.body = response;
        }catch (err){
            ctx.body = err;
        }
    },
    async updateCategory(ctx){
        try {
            const { category_id,store_id } = ctx.params;
            const { store_item_categorie_id,store_items,name  } = ctx.request.body;
            const response = await strapi.entityService.update('api::store-item-categorie.store-item-categorie', category_id , { data:{
                store_item_categorie_id,
                store_items,
                store_id:store_id,
                name
            },
            filters : {store_id : store_id}
        });
            ctx.body = response;
        }catch (err){
            ctx.body = err;
        }
    },
    async createCategory(ctx){
        try {
            const { store_id } = ctx.params;
            const { store_item_categorie_id,store_items,name  } = ctx.request.body;
            const response = await strapi.entityService.create('api::store-item-categorie.store-item-categorie', { data:{
                store_item_categorie_id,
                store_items,
                store_id:store_id,
                name
            },
            filters : {store_id : store_id}
        });
            ctx.body = response;
        }catch (err){
            ctx.body = err;
        }
    },
    async deleteCategory(ctx){
        try {
            const { category_id,store_id } = ctx.params;
            const response = await strapi.entityService.delete('api::store-item-categorie.store-item-categorie', category_id,{
                filters: {store_id:store_id}
            });
            ctx.body = {message: 'Category deleted successfully'};
        }catch (err){
            ctx.body = err;
        }
    },



    //item category
    //item category
    //item category
    //item category

    async getAllItemCategory(ctx){
        try {
            const { category_id,store_id } = ctx.params;
            const response = await strapi.entityService.findMany('api::store-item.store-item',{
                filters : [{store_item_categorie_id : category_id},{store_id:store_id}]
            });
            ctx.body = response;
        }catch (err){
            ctx.body = err;
        }
    },
    async getOneItemCategory(ctx){
        try {
            const { category_id,store_id,item_id } = ctx.params;
            const response = await strapi.entityService.findOne('api::store-item.store-item',item_id,{
                filters : [{store_item_categorie_id : category_id},{store_id:store_id}]
            });
            ctx.body = response;
        }catch (err){
            ctx.body = err;
        }
    },
    async updateItemCategory(ctx){
        try {
            const { category_id,store_id,item_id } = ctx.params;
            const { store_item_categorie_id,store_items,name  } = ctx.request.body;
            const response = await strapi.entityService.update('api::store-item.store-item', item_id , { data:{
                store_item_categorie_id,
                store_items,
                store_id:store_id,
                name
            },
            filters : [{store_item_categorie_id : category_id},{store_id:store_id}]
        });
            ctx.body = response;
        }catch (err){
            ctx.body = err;
        }
    },
    async createItemCategory(ctx){
        try {
            const { category_id,store_id } = ctx.params;
            const { store_item_categorie_id,store_items,name  } = ctx.request.body;
            const response = await strapi.entityService.create('api::store-item.store-item', { data:{
                store_item_categorie_id,
                store_items,
                store_id:store_id,
                name
            },
            filters : [{store_item_categorie_id : category_id},{store_id:store_id}]
        });
            ctx.body = response;
        }catch (err){
            ctx.body = err;
        }
    },
    async deleteItemCategory(ctx){
        try {
            const { category_id,store_id,item_id } = ctx.params;
            const response = await strapi.entityService.delete('api::store-item.store-item', item_id,{
                filters: [{store_item_categorie_id : category_id},{store_id:store_id}]
            });
            ctx.body = {message: 'Category deleted successfully'};
        }catch (err){
            ctx.body = err;
        }
    },
}));
