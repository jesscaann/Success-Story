import RESTapi from "./restapi";
import Storage from "./Storage";
import assert from "assert";
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
   * @param {Object} values; this is the full undoctored case study and all its options
   * @param {int} caseStudyId; this is the caseStudyId from the caseStudyPost. This is used
   *  in the creation of caseStudyTechnology entries into the RESTapi
   */
  postCaseStudyTechnologies: (values, caseStudyId) => {
    console.log(caseStudyId);

    var technologies = values.technology;
    var technologyOptions = values.technologyOptions;

    technologies.forEach(technology => {
      var technologyId = privateMethods.findId(technology, technologyOptions);

      var newCaseStudyTechnologyEntry = {
        technologyId: technologyId,
        caseStudyId: caseStudyId
      };
      RESTapi.postCaseStudyTechnology(newCaseStudyTechnologyEntry).then(res => {
        console.log(res);
      });
    });
  },

  /**
   *
   *
   *
   * @param {String} entry
   * @param {List} collection
   */
  findId: (entry, collection) => {
    // console.log(entry);
    // console.log(collection);

    var entity = collection.find(obj => {
      if (obj.value === entry) {
        // console.log(obj.id);
        return obj.id;
      }
    });
    // console.log(entity.id);
    return entity.id;
  },

  /**
   * Need to pull IDs for
   *  - client
   *  - engagementName (from dummy data in the RESTapi)
   *  - industry
   *  - technology []
   *  - practice
   *  - engagementModelLevel
   *  - staffingModel
   *
   *  To pull ID's...
   *  - Take the text in the current
   *
   *
   *  As well, we need to make entries for
   *  - caseStudyTechnologies
   *    Such that an entry is created for each technology used
   *      caseStudy.id + technology.id * (number of Technologies)
   *
   *  Finally, we need to post the cs_techs and the caseStudy
   *  handle any errors (not likely)
   *  and re-poll the local _data store to be updated
   * @param {Object} values
   */
  formatCaseStudy: values => {
    // Copy values into newEntry
    var formatted = JSON.parse(JSON.stringify(values));
    console.log(values);
    // each of these has to be a search to return the correct ids

    var foundIds = {
      clientId: privateMethods.findId(
        formatted.clientName,
        formatted.clientOptions
      ),
      industryId: privateMethods.findId(
        formatted.industry,
        formatted.industryOptions
      ),
      practiceId: privateMethods.findId(
        formatted.practice,
        formatted.practiceOptions
      ),
      staffingDeliveryModelId: privateMethods.findId(
        formatted.staffingModel,
        formatted.staffingModelOptions
      ),
      engagementModelId: privateMethods.findId(
        formatted.engagementModelLevel,
        formatted.engagementModelLevelOptions
      )
    };

    // console.log(foundIds);

    delete formatted.sizeOfEngagement;
    delete formatted.durationOfEngagement;
    delete formatted.engagementValue;
    delete formatted.resultsAchieved;

    delete formatted.clientName;
    delete formatted.industry;
    delete formatted.practice;
    delete formatted.engagementModelLevel;
    delete formatted.staffingModel;

    delete formatted.clientOptions;
    delete formatted.engagementModelLevelOptions;
    delete formatted.engagementNameOptions;
    delete formatted.industryOptions;
    delete formatted.practiceOptions;
    delete formatted.staffingModelOptions;
    delete formatted.technologyOptions;
    delete formatted.technology;

    formatted.userName = "emclaugh";
    formatted.engagementSize = values.sizeOfEngagement;
    formatted.engagementDuration = values.durationOfEngagement;
    formatted.engagementRevenue = values.engagementValue;
    formatted.valueStatement = values.resultsAchieved;

    return _.merge(formatted, foundIds);
  },

  // #region population
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
    var formatted = privateMethods.formatCaseStudy(values);

    Storage.setCaseStudy(formatted);
    Storage.logCaseStudy();
    RESTapi.postCaseStudy(formatted).then(caseStudyId => {
      privateMethods.postCaseStudyTechnologies(values, caseStudyId);
    });
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
