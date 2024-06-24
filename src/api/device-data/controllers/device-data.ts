'use strict'
import { factories } from '@strapi/strapi'; 
import { HttpStatusCode } from 'axios';
import { calculateAverageDeviceData } from '../../../helper/AverageDeviceData';

var isAlerted = false;

export default factories.createCoreController('api::device-data.device-data', ({strapi}) => ({
    async getDeviceDatas(ctx){
        try {
            const { id } = ctx.state.user ? ctx.state.user : Object.create(null);

            const get_device_filters = async () => {
                const filters = { user : id };
                const fields = ['id'];
                const device_filters:Array<number> = [];
                const responses = await strapi.entityService.findMany('api::device.device',{ filters , fields });
                for(let response of responses){
                    const device_id:number = response.id;
                    device_filters.push(device_id);
                }
                return device_filters;
            }
            
            const filters = {};
            const sort = { id : 'desc'};
            if(ctx.params.searchCriteria){
                const { searchCriteria } = JSON.parse(ctx.params.searchCriteria);

                const { date , dateTo } = searchCriteria
                
                if(!!searchCriteria){
                    filters["dateTime"] = {
                        $gte : !date ? '1900-01-01T00:00:00.000Z': date.slice(0,10) + 'T00:00:00.000Z',
                        $lte : !dateTo ? '2199-12-31T00:00:00.000Z': dateTo.slice(0,10) + 'T23:59:59.999Z'
                    };
                }
                

            }
            if(id){
                filters["device"] = await get_device_filters();
            }
            
            const populate = ['device'];
            const device_datas = await strapi.entityService.findMany('api::device-data.device-data' , { filters , populate , sort });
            
        
            ctx.body = { data : device_datas };
            
        } catch (err) {
            console.log(err);
            return ctx.badRequest(err);
        }
    },
    async getDeviceData(ctx){
        try {
            const { id } = ctx.state.user ? ctx.state.user : Object.create(null);
            

            const get_device_filters = async () => {
                const filters = { user : id };
                const fields = ['id'];
                const device_filters:Array<number> = [];
                const responses = await strapi.entityService.findMany('api::device.device',{ filters , fields });
                for(let response of responses){
                    const device_id:number = response.id;
                    device_filters.push(device_id);
                }
                return device_filters;
            }
            
            const filters = {};
            const sort = { dateTime : 'desc'};
           
            if(id){
                filters["device"] = await get_device_filters();
            }
            
            const populate = ['device'];
            const [ device_data ] = await strapi.entityService.findMany('api::device-data.device-data' , { filters , populate , sort , limit:1 });
            
        
            ctx.body = { data : device_data };
            
        } catch (err) {
            console.log(err);
            return ctx.badRequest(err);
        }
    },
    async create(ctx){
        try{
            const { data } = ctx.request.body;
            const response = await strapi.entityService.create('api::device-data.device-data' , { data });
            ctx.body = response;
            // Trigger Event
            const device = await strapi.entityService.findOne('api::device.device' , data.device , { populate : 'user' });
            const { id } = device.user;

            // GET FCM TOKEN
            const { firebaseMobileNotificationToken, firebaseWebNotificationToken } = await strapi.entityService.findOne('plugin::users-permissions.user' , id);

            //SELECT
            const filters = {};
            const sort = { id : 'desc'};
            
            const populate = ['device'];
            const device_data  = await strapi.entityService.findMany('api::device-data.device-data' , { filters , populate , sort , limit:1 });

            console.log(device_data)
            const recoveryToken = "ehuMidp0frQkyXVhu18j7c:APA91bFMkZtEj8d1gWDAezbrxKt1HmDGHMKWDIpLkz7uLdsoBmKeRjuvTBOkT1MsUhzipRhxCyULGr5RQ2DQm9RsvtGzlGbIyMCNkY3igViqm7SIsqlSQC-XuLaNIo6wP9YWO6S8ptAU";
            await strapi.service("api::firebase-clound-messaging.firebase-clound-messaging").sendMessageToDevices([ firebaseWebNotificationToken ], "device-datas",JSON.stringify({data :device_data}),{});
            await strapi.service("api::firebase-clound-messaging.firebase-clound-messaging").sendMessageToDevices([ firebaseMobileNotificationToken ], "device-datas",JSON.stringify({data :device_data}),{});
            await strapi.service("api::firebase-clound-messaging.firebase-clound-messaging").sendMessageToDevices([ recoveryToken ], "device-datas",JSON.stringify({data :device_data}),{});
            
           var isFallDetect = false;
           if(device_data[0].fallDetect == "1"){
            isFallDetect = true;
           }
           if(isFallDetect && !isAlerted){
            isAlerted = true;
            await strapi.service("api::firebase-clound-messaging.firebase-clound-messaging").sendMessageToDevices([ firebaseMobileNotificationToken ], "emergency-alert"," ",{});
           }
           isAlerted = isFallDetect;
            
        } catch (err) {
            console.log(err);
            return ctx.badRequest(err);
        }
    },
    async getMyDeviceData(ctx) {
        try {
            const { id : userId } = ctx.state.user;

            if (!userId) {
                return ctx.badRequest('User not found');
            }

            const myDevices = await strapi.entityService.findMany('api::device.device', {
                filters: {
                    user: userId 
                },
                fields: ['id'], 
                limit: 1,
            });

            if (!myDevices) {
                return ctx.badRequest('No devices found for this user');
            }
            
            const deviceId = myDevices.map(device => device.id);
            // get all device-data associated with that users
            const myDevicesData = await strapi.entityService.findMany('api::device-data.device-data', {
                filters: {
                    device: deviceId,
                },
                populate: {
                    device: true, 
                },
                limit: 100,
                sort: { id: 'desc' },
            });

            const response = {
                statusCode: HttpStatusCode.Ok,
                data: myDevicesData,
            }

            ctx.body = response;
        } catch (error) {
            console.error("There is an error getting your device datas:", error);
            return ctx.badRequest(error)
        }
    },
    async getMyAverageDeviceData(ctx) {
        try {
            const { id: userId } = ctx.state.user;
            if (!userId) {
                return ctx.badRequest('User not found');
            }
    
            const myDevices = await strapi.entityService.findMany('api::device.device', {
                filters: {
                    user: userId 
                },
                fields: ['id'], 
            });
            if (!myDevices) {
                return ctx.badRequest('No devices found for this user');
            }
            const deviceId = myDevices.map(device => device.id);

            // get all device-data associated with that users
            const myDevicesData = await strapi.entityService.findMany('api::device-data.device-data', {
                filters: {
                    device: deviceId,
                },
                populate: {
                    device: true, 
                },
            });
    
            const averages = calculateAverageDeviceData(myDevicesData);
            ctx.body = { statusCode: 200, data: averages };
        } catch (error) {
            console.error("There is an error calculating the averages:", error);
            return ctx.badRequest(error);
        }
    }
}));

