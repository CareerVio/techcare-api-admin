export default {
    routes: [
      {
        method: 'GET',
        path: '/questionnaire', 
        handler: 'questionnaire.getQuestionnaire',
      },
      {
        method: 'POST',
        path: '/questionnaires', 
        handler: 'questionnaire.createQuestionnaire',
      },
    ]
  }