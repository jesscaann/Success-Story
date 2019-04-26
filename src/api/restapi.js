import api from "./axios-rest-connection";

class restapi {
  static getIndustries = async () => {
    var industries;
  };
  static getClients = async () => {
    var clients = {};
    await api.get("/clients/").then(res => {
      clients = res.data;

      /**
       * Manipulate data to have a keys of
       * key: text: value:
       * that all have the data from clientName
       */
      clients.forEach(client => {
        var name = client.clientName;

        /**
         * Takes in each object from the axios response and manipulates its data
         *
         * Since the dropdown menu requires a list of objects with the three keys
         * - key
         * - text
         * - value
         * we set all of these to be the clientName from the client object
         */
        delete client.clientName;
        delete client.caseStudies;
        client.key = name;
        client.text = name;
        client.value = name;
      });
    });

    return clients;
  };
  static getEngagementNames = async () => {
    /**
     * Eventually, Sogeti will have to store potential engagement names themselves.
     * So this is in preparation for that. For the moment though, we have
     * dummy data.
     */
    return [
      {
        id: 1,
        key: "Discov&CloudMigrRead",
        text: "Discovery & Cloud Migration Readiness",
        value: "Discovery & Cloud Migration Readiness "
      },
      {
        id: 2,
        key: "EngageName2",
        text: "Engagement Name 2",
        value: "Engagement Name 2 "
      },
      {
        id: 3,
        key: "EngageName3",
        text: "Engagement Name 3",
        value: "Engagement Name 3 "
      },
      {
        id: 4,
        key: "EngageName4",
        text: "Engagement Name 4",
        value: "Engagement Name 4 "
      }
    ];
  };
}

export default restapi;
