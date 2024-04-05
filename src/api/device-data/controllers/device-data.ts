'use strict'
import { factories } from '@strapi/strapi'; 
import { HttpStatusCode } from 'axios';
import { calculateAverageDeviceData } from '../../../helper/AverageDeviceData';

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

            const { id: userId } = ctx.state.user;
            const { data } = ctx.request.body;
            
            const payload = {
                ...data,
                userId: userId,
            }

            const response = await strapi.entityService.create('api::device-data.device-data' , { data : payload });

            ctx.body = response;
            
        } catch (err) {
            console.log(err);
            return ctx.badRequest(err);
        }
        
    },
    async getMyDeviceData(ctx) {
        try {
            const { id : userId } = ctx.state.user;
            console.log("Requesting the device data from:", userId)
            if (!userId) {
                return ctx.badRequest('User not found');
            }

            // get all device-data associated with that users
            const myDevicesData = await strapi.entityService.findMany('api::device-data.device-data', {
                filters: {
                    userId: userId  
                },
                populate: {
                    device: true, 
                },
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
    
            const myDevicesData = await strapi.entityService.findMany('api::device-data.device-data', {
                filters: { userId: userId },
                fields: [
                    'heartRate', 'bloodPressureDia', 'bloodPressureSys',
                    'temperature', 'spo2', 'stepCount'
                ],
            });
    
            const averages = calculateAverageDeviceData(myDevicesData);
            ctx.body = { statusCode: 200, data: averages };
        } catch (error) {
            console.error("There is an error calculating the averages:", error);
            return ctx.badRequest(error);
        }
    }
}));

