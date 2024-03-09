/**
 * store-item-categorie controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::store-item-categorie.store-item-categorie', ({ strapi }) => ({
    async getCategory(ctx){
        try {
            const { id } = ctx.params;
            const response = await strapi.entityService.findOne('api::store-item-categorie.store-item-categorie',id,{
            });
            ctx.body = response;
        }catch (err){
            ctx.body = err;
        }
    },
    async getAllCategory(ctx){
        try {
            const response = await strapi.entityService.findMany('api::store-item-categorie.store-item-categorie',{
            });
            ctx.body = response;
        }catch (err){
            ctx.body = err;
        }
    },
    async updateCategory(ctx){
        try {
            const { id } = ctx.params;
            const { data } = ctx.request.body;
            const response = await strapi.entityService.update('api::store-item-categorie.store-item-categorie', id , { data });
            ctx.body = response;
        }catch (err){
            ctx.body = err;
        }
    },
    async createCategory(ctx){
        try {
            const { data } = ctx.request.body;
            const response = await strapi.entityService.create('api::store-item-categorie.store-item-categorie', { data });
            ctx.body = response;
        }catch (err){
            ctx.body = err;
        }
    },
    async deleteCategory(ctx){
        try {
            const { id } = ctx.params;
            const response = await strapi.entityService.delete('api::store-item-categorie.store-item-categorie', id);
            ctx.body = response;
        }catch (err){
            ctx.body = err;
        }
    },

    async getItemCategory(ctx){
        try {
            const { id } = ctx.params;
            const response = await strapi.entityService.findMany('api::store-item.store-item',{
                categorie: id
            });
            ctx.body = response;
        }catch (err){
            ctx.body = err;
        }
    },
    async getOneItemCategory(ctx){
        try {
            const { id } = ctx.params;
            const response = await strapi.entityService.findOne('api::store-item.store-item',id,{
            });
            ctx.body = response;
        }catch (err){
            ctx.body = err;
        }
    },
    async updateItemCategory(ctx){
        try {
            const { id } = ctx.params;
            const { data } = ctx.request.body;
            const response = await strapi.entityService.update('api::store-item.store-item', id , { data });
            ctx.body = response;
        }catch (err){
            ctx.body = err;
        }
    },
    async createItemCategory(ctx){
        try {
            const { data } = ctx.request.body;
            const response = await strapi.entityService.create('api::store-item.store-item', { data });
            ctx.body = response;
        }catch (err){
            ctx.body = err;
        }
    },
    async deleteItemCategory(ctx){
        try {
            const { id } = ctx.params;
            const response = await strapi.entityService.delete('api::store-item.store-item', id);
            ctx.body = response;
        }catch (err){
            ctx.body = err;
        }
    },
}));
