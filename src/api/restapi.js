import api from "./axios-rest-connection";

class restapi {
  /**
   * TODO: post the actual case study with ID's and such
   */
  static postCaseStudy = async entry => {
    console.log("posting Case Study:");
    console.log(entry);
  };

  static getCaseStudies = async () => {
    /**
     * This function async polls the rest API for the
     * case studies. It is needed so that later when a user
     * is submitting their case stduy information, we can check
     * for duplicates without polling the database more than once.
     *
     * As well, since these are not displayed in a dropdown menu
     * we do not need to manipulate each object (see other methods
     * like getIndustries())
     *
     * Likely, the implementation of this function might change over
     * time, or the implementation of the populateCaseStudies() method in
     * data.js
     */

    var caseStudies = {};

    await api.get("/casestudies/").then(res => {
      caseStudies = res.data;
    });

    return caseStudies;
  };
  static getCaseStudyTechnologies = async () => {
    var cs_techs = {};
    await api.get("/casestudytechnologies/").then(res => {
      cs_techs = res.data;

      /**
       * No need for manipulation of the JSON here as these
       * are not displayed to the user. The reason for the deletion
       * of keys for all the other simple tables is so that
       * they can be directly placed into the tables without any
       * manipulation by the time the data reaches the React component
       *
       * 

       * */
    });

    return cs_techs;
  };

  /**
   * All these methods could eventually be collapsed into
   * a generic one like
   *
   * static getEntries = async apiRoute => {
   *    var entries = {};
   *    var fullRoute = "/" + apiRoute + "/";
   *
   *    await api.get(fullRoute).then(res=> {
   *      entries = res.data;
   *
   *        // manipulate entries if needed
   *    });
   *    return entries;
   * }
   */
  static getStaffingModels = async () => {
    var staffingModels = {};
    await api.get("/staffingdeliverymodels/").then(res => {
      staffingModels = res.data;
      staffingModels.forEach(staffingModel => {
        var staffingModelName = staffingModel.modelName;
        delete staffingModel.caseStudies;

        staffingModel.key = staffingModelName;
        staffingModel.text = staffingModelName;
        staffingModel.value = staffingModelName;
      });
    });
    return staffingModels;
  };
  static getEngagementModels = async () => {
    var eModels = {};
    await api.get("/engagementmodels/").then(res => {
      eModels = res.data;

      eModels.forEach(eModel => {
        var modelLevel = eModel.engagementModelLevel;
        delete eModel.engagementModelLevel;

        eModel.key = modelLevel;
        eModel.text = modelLevel;
        eModel.value = modelLevel;
      });
    });

    return eModels;
  };
  static getPractices = async () => {
    var practices = {};
    await api.get("/practices/").then(res => {
      practices = res.data;

      practices.forEach(practice => {
        var name = practice.practiceName;

        delete practice.practiceName;
        delete practice.caseStudies; // this might not need to be there
        practice.key = name;
        practice.text = name;
        practice.value = name;
      });
    });
    return practices;
  };
  static getTechnologies = async () => {
    var technologies = {};
    await api.get("/technologies/").then(res => {
      technologies = res.data;
      technologies.forEach(technology => {
        var name = technology.technologyName;

        delete technology.caseStudyTechnologies;
        /**
         * Normally, this key holds a null value and it is not a big deal
         * if we keep it inside the JSON for each entry.
         *
         *
         * However, it does throw a warning if entries have a key with the
         * name "caseStudyTechnologies" due to this technically becoming
         * a 'nonstandard prop on a DOM element'. Therefore to remove this error,
         * we remove this key
         */
        delete technology.technologyName;
        technology.key = name;
        technology.text = name;
        technology.value = name;
      });
    });
    return technologies;
  };
  static getIndustries = async () => {
    var industries = {};
    await api.get("/industries/").then(res => {
      industries = res.data;

      industries.forEach(industry => {
        var name = industry.industryName;

        delete industry.industryName;
        delete industry.caseStudies;
        industry.key = name;
        industry.text = name;
        industry.value = name;
      });
    });
    return industries;
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
