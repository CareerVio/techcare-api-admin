export default {
    routes: [
      {
        method: 'GET',
        path: '/questionnaire', 
        handler: 'questionnaire.getQuestionnaire',
      },
      {
        method: 'GET',
        path: '/questionnaire/:userid', 
        handler: 'questionnaire.getQuestionnaire',
      },
      {
        method: 'POST',
        path: '/questionnaires', 
        handler: 'questionnaire.createQuestionnaire',
      },
    ]
  }