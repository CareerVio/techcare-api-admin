
interface Publisher{
    user:string;
    api:string;
    detail;
}

const publishers = {};
const TIMEOUT = 30;

export default () => ({
    async subscribe( user:string , api:string ){
        console.log("HEY");
        const timeout = (TIMEOUT) * 1000;
        console.log("POLLING-START : " + user + " " + api);

        let response = {};

        function subscribe_publisher(){
            console.log("LOOP");
            for(let id in publishers){
                const publisher:Publisher = publishers[id];
                if(publisher.user == user && publisher.api == api){
                    console.log("FOUND!");
                    response = publisher.detail;
                    delete publishers[id];

                    clearInterval(this);
                }
            }
        }

        const interval = setInterval(subscribe_publisher , 1000);
        
        setTimeout(() => {
            console.log("POLLING-TIMEOUT");
            clearInterval(interval);
        }, timeout);
        var currentTime = new Date().getTime();
        while( timeout >= new Date().getTime() - currentTime){
         
        }
        return response;
        
    },
    async publish( user:string, api:string , detail = {} ){
        console.log("Publish : " + user + " " + api);
        const id = Math.random();
        publishers[id] = { user , api , detail };
    },
});
