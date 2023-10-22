export default {
    /**
     * Triggered before user creation.
     */
      afterCreate(result, data) {
        // add your code here to send a mail here with resto data 
        console.log('inserted data', result);
        console.log('data received', data);
      },
  };
  