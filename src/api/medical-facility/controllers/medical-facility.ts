
import { factories } from '@strapi/strapi'; 

export default factories.createCoreController('api::medical-facility.medical-facility', ({ strapi }) => ({
    async find(ctx){
        try {
            const populate = ['medicalFacilityImage'];
            const data =  await strapi.entityService.findMany('api::medical-facility.medical-facility',{ populate });
            ctx.body = { data };
        } catch (err) {
            ctx.body = err;
        }
    },
    async getMedicalFacilitiesBySearch(ctx) {
        try {
            const { searchCriteria } = JSON.parse(ctx.params.searchCriteria);
            const { type , textSearch } = searchCriteria;
            
            const filters = {
                type : {$containsi : type},
                $or : [
                    {name : {$containsi : textSearch}},
                    {detail : {$containsi : textSearch}},
                    {detail : {$containsi : textSearch}},
                ]
            }
            const populate = ['medicalFacilityImage'];
            const data =  await strapi.entityService.findMany('api::medical-facility.medical-facility',{ filters , populate });
            ctx.body = { data };
        } catch (err) {
            console.log(err);
            ctx.body = err;
        }
    },
    async getMedicalFacilityByLocation(ctx) {
        try {
            const { searchCriteria } = JSON.parse(ctx.params.searchCriteria);
            const { lat , lng } = searchCriteria
            
            const populate = ['medicalFacilityImage'];
            const records =  await strapi.entityService.findMany('api::medical-facility.medical-facility' , { populate });
            let data = records[0], mnDis = 2e9;
            records.forEach(record => {
                const {locationLat , locationLng} = record;
                const getDistance = (x1 , x2 , y1 , y2) => {
                    return  Math.sqrt((x1 - x2)*(x1 - x2) + (y1 - y2)*(y1 - y2));
                };
                const dis = getDistance(lat , locationLat , lng , locationLng);
                if(dis < mnDis){
                    mnDis = dis;
                    data = record;
                }
            });
            ctx.body = data
        } catch (err) {
            ctx.body = err;
        }
    },
}));
