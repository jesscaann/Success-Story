import RESTapi from "./restapi";
/**
 * this is the serialized database. It is declared
 * above the class definition so that it is functionally
 * like a Private attribute
 */
var _data = {};

/**
 * here are all the private methods that cannot be accessed
 * outside the scope of this .js file
 */
const privateMethods = {
  /**
   * Methods to populate the _data
   *
   * These could eventually be collapsed into a
   * generic method like
   *
   * populateEntries(apiRoute) {
   *
   *    RESTapi.getEntries(apiRoute).then(res=> {
   *        _data[apiRoute] = res;
   *    });
   * };
   */
  populateClients() {
    RESTapi.getClients().then(res => {
      _data.clients = res;
    });
  },
  populateEngagementNames() {
    RESTapi.getEngagementNames().then(res => {
      _data.engagementNames = res;
    });
  },
  populateIndustries() {
    RESTapi.getIndustries().then(res => {
      _data.industries = res;
    });
  },
  populateTechnologies() {
    RESTapi.getTechnologies().then(res => {
      _data.technologies = res;
    });
  },
  populatePractices() {
    RESTapi.getPractices().then(res => {
      _data.practices = res;
    });
  },
  populateEngagementModels() {
    RESTapi.getEngagementModels().then(res => {
      _data.engagementModelLevels = res;
    });
  },
  populateStaffingModels() {
    RESTapi.getStaffingModels().then(res => {
      _data.staffingDeliveryModels = res;
    });
  },

  populateCaseStudyTechnologies() {
    RESTapi.getCaseStudyTechnologies().then(res => {
      _data.caseStudyTechnologies = res;
    });
  },

  populateCaseStudies() {
    RESTapi.getCaseStudies().then(res => {
      _data.caseStudies = res;
    });
  },
  /**
   * Calls all other population methods
   */
  populateDATA() {
    privateMethods.populateClients();
    privateMethods.populateEngagementNames();
    privateMethods.populateIndustries();
    privateMethods.populateTechnologies();
    privateMethods.populatePractices();
    privateMethods.populateEngagementModels();
    privateMethods.populateStaffingModels();
    privateMethods.populateCaseStudyTechnologies();
    privateMethods.populateCaseStudies();
  }
};

/**
 * A sloppy but functional singleton class for serializing
 * all the data from the RESTapi. All public methods
 * are declared within the class declaration, while private
 * methods and attributes are declared above.
 *
 *
 * Any time new DataHandler() is called, this will return
 * an instance of the DataHandler class and not a new one.
 * This instance can then call gets and posts eventually
 */
class DataHandler {
  constructor() {
    if (!DataHandler.instance) {
      DataHandler.instance = this;
      privateMethods.populateDATA();

      // testing if all data comes in
      console.log(_data);
    }
    return DataHandler.instance;
  }

  get(key) {
    return JSON.parse(JSON.stringify(_data[key]));
  }

  toJSON() {
    return JSON.parse(JSON.stringify(_data));
  }
}

export default DataHandler;
