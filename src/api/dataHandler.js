import RESTapi from "./restapi";
import Storage from "./Storage";
var _ = require("lodash");
/**
 * this is the serialized database. It is declared
 * above the class definition so that it is functionally
 * like a Private attribute
 */

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
  // #region population
  populateClients() {
    RESTapi.getClients().then(res => {
      Storage._data.clients = res;
    });
  },
  populateEngagementNames() {
    RESTapi.getEngagementNames().then(res => {
      Storage._data.engagementNames = res;
    });
  },
  populateIndustries() {
    RESTapi.getIndustries().then(res => {
      Storage._data.industries = res;
    });
  },
  populateTechnologies() {
    RESTapi.getTechnologies().then(res => {
      Storage._data.technologies = res;
    });
  },
  populatePractices() {
    RESTapi.getPractices().then(res => {
      Storage._data.practices = res;
    });
  },
  populateEngagementModelLevels() {
    RESTapi.getEngagementModelLevels().then(res => {
      Storage._data.engagementModelLevels = res;
    });
  },
  populateStaffingModels() {
    RESTapi.getStaffingModels().then(res => {
      Storage._data.staffingDeliveryModels = res;
    });
  },

  populateCaseStudyTechnologies() {
    RESTapi.getCaseStudyTechnologies().then(res => {
      Storage._data.caseStudyTechnologies = res;
    });
  },

  populateCaseStudies() {
    RESTapi.getCaseStudies().then(res => {
      Storage._data.caseStudies = res;
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
    privateMethods.populateEngagementModelLevels();
    privateMethods.populateStaffingModels();
    privateMethods.populateCaseStudyTechnologies();
    privateMethods.populateCaseStudies();
  }
  //#endregion population
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
      Storage.init();

      // testing if all data comes in
    }
    return DataHandler.instance;
  }
  /**
   * Takes in a JSON of values calls a formatting function
   *
   * Once found, these IDs are placed into the [values] JSON
   * which is then POST'd throug the RESTapi to the database
   * @param {JSON} values
   */
  submitCaseStudy = values => {
    Storage.setCaseStudy(values);
    Storage.logCaseStudy();
  };
  // #region simpleMethods
  /**
   * Takes in a key which will return the entries
   * from _data at [key]
   *
   * This should ideally be all lowercase so as to match
   * the api/route format
   *
   * As of 26/04/2019, this lowercase restriction is NOT applied
   * @param {String} key
   */
  get = key => {
    return JSON.parse(JSON.stringify(Storage._data[key]));
  };

  /**
   * Makes a deep copy of the _data and
   * returns this JSON
   */
  toJSON = () => {
    return JSON.parse(JSON.stringify(Storage._data));
  };

  /**
   * Pulls data from the database and updates local
   * _data snapshot
   */
  refreshData = async () => {
    await privateMethods.populateDATA();
  };

  // #endregion
}

export default DataHandler;
