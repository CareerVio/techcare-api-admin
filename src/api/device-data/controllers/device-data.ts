
import { factories } from '@strapi/strapi'; 

export default factories.createCoreController('api::device-data.device-data', ({strapi}) => ({
    async getDeviceDatas(ctx){
        try {
            const { id } = ctx.state.user ? ctx.state.user : Object.create(null);
            const { fetchOption } = ctx.params;
            
            if(fetchOption == "long-polling"){
                await strapi.service('api::long-polling.long-polling').subscribe( id , '/device-datas/:searchCriteria');
            }

            //INNTER JOIN

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
            
            //SELECT
            const filters = {};
            const sort = { dateTime : 'desc'};
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
            const { fetchOption } = ctx.params;
            
            if(fetchOption == "long-polling"){
                await strapi.service('api::long-polling.long-polling').subscribe( id , '/device-datas/:searchCriteria');
            }

            //INNTER JOIN

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
            
            //SELECT
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

            //trigger_event
            const device = await strapi.entityService.findOne('api::device.device' , data.device , { populate : 'user' });
            const { id } = device.user;

            await strapi.service('api::long-polling.long-polling').publish( id , '/device-datas/:searchCriteria' , {} );

            const { fallDetect } = data;
            
            console.log(fallDetect);
            if(fallDetect == "1"){
                await strapi.service('api::long-polling.long-polling').publish( id , '/emergency' , {
                    topic : "Fall Detect!",
	                message : "ไม้เท้าล้ม กรุณาเลือกทางเลือกที่เหมา"
                } );
            }
            
        } catch (err) {
            console.log(err);
            return ctx.badRequest(err);
        }
        
    },
}));
