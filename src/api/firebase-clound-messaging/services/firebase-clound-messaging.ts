/**
 * firebase-clound-messaging service
 */
'use strict';

import admin from "firebase-admin"
const serviceAccount = require("../../../tech-care-system-firebase-adminsdk-ehfkj-45dc60e58d.json");

export default () => ({
    initNotifications() {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
        console.log('Notifications initialized...');
    },
     
    // a topic is automatically created when there is at least 1 subscriber(token) assigned to it
    // a topic is automatically deleted when there are no more subscribers assigned to it
    // so to delete a topic, just remove all of the subscribers for the topic  
    
    async sendMessageToTopic(title, body,token) {
          const message = {
            notification: {
              title: title,
              body: body
            },			
            token: token
          };
          
          let respObj = {
              method: 'sendMessageToTopic',
              message: message,
              response: ''
          };
        
        try {
            respObj.response = await admin.messaging().send(message);
            return respObj;
        } catch(err)  {
            strapi.log.error('Notifications/sendMessageToTopic', err.errorInfo);
              // throw new Error(err);
          }
    },
    
      async sendMessageToDevices(tokens, title, description, data) {
          const message = {
            notification: {
              title: title,
              body: description
            },			
            data: data,
            tokens: tokens
          };
          
          try {
              const response = await admin.messaging().sendMulticast(message);
          } catch(err) {
              strapi.log.error('Notifications/sendMessageToDevices', err.errorInfo);
              //throw new Error(err);
          }
      },   

});
