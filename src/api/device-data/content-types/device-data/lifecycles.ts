import axios from "axios";
async function deviceLocationVerify(result){
    const deviceData = await strapi.entityService.findOne('api::device-data.device-data',result["id"],{
        populate : ["device"]
    }); 
    const number = deviceData.device.number;
    const token = process.env.SIM_API_TOKEN;
    const { data } = await axios.post('https://test-apigw.dtac.co.th/openApi/location-verification/v0/verify', {
        "device": {
            "phoneNumber": number
        },
        "area": {
            "type": "Circle",
            "location": {
                "latitude": result["lat"],
                "longitude": result["lng"]
            },
            "accuracy": 2000
        }
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + token
        }
    });
    try {
        await strapi.entityService.update('api::device-data.device-data',result["id"], { data: { verification_result : data.verificationResult }});
    } catch(err) {
        console.log(err);
    }
};
export default {
    /**
    * Triggered before user creation.
    */
    async afterCreate(result) {
        //Fix from Strapi api response structure
        result = result.result;
        deviceLocationVerify(result);
       
    },
};