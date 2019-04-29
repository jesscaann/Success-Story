import RESTapi from "./restapi";
import Storage from "./Storage";
var _ = require("lodash");

/**
 * here are all the private methods that cannot be accessed
 * outside the scope of this .js file. This is done to make sure the singleton
 * is able to have helper
 */
const privateMethods = {
  /**
   * @param {Object} values this is the full undoctored case study and all its options
   * @param {int} caseStudyId this is the caseStudyId from the caseStudyPost. This is used
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
   * @param {String} entry a string value representing a user's dropdown choice
   * @param {List} collection a list of Objects that hold all possible options for dropdown box specified
   * Takes in an [entry] and a [collection] to search in.
   * This [collection] contains JSON objects with 4 fields, two of which are [id] and [value]
   *
   * First, this function searches the [collection] with [find] in order to pull out where the
   * [entry] equals the current object's [value] key. In this case, we want to return the corrosponding [id]
   *
   *
   * However, with testing, it was discovered in testing this function that {return obj.id} merely returned the Object
   * itself. Therefore, this is assigned to a variable [entity] and [entity.id] is returned.
   *

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
   * @param {JSON} values the values of the full case study and all options; the state of Mainform.jsx
   * @returns {JSON} formatted JSON object of only necessary attributes for POSTing a CaseStudy
   *
   *
   * We take in the variable [values] and copy its data to a new object
   * named [formatted]. This will become our properly formatted JSON that we can
   * pass into the RESTapi's POST method
   *
   * However, first we need to pull IDs for
   *  - client
   *  - engagementName (from dummy data in the RESTapi)
   *  - industry
   *  - practice
   *  - engagementModelLevel
   *  - staffingModel
   *
   *  To pull ID's...
   *  - call findId passing the [entry] we want to find and the [collection] it should be in
   *
   * After all the corresponding Ids have been pulled, they are stored
   * inside an Object called [foundIds].
   *
   * Soon after, any key within [formatted] that is not needed to POST a CaseStudy is deleted
   *
   * Finally, the [formatted] Object and [foundIds] Objected are merged together and returned
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

    // deleting keys that are not needed to POST a case study

    // deleting keys that need to be renamed
    delete formatted.sizeOfEngagement;
    delete formatted.durationOfEngagement;
    delete formatted.engagementValue;
    delete formatted.resultsAchieved;

    // deleting keys that have been replaced with corresponding IDs
    delete formatted.clientName;
    delete formatted.industry;
    delete formatted.practice;
    delete formatted.engagementModelLevel;
    delete formatted.staffingModel;

    // deleting keys that held all the possible options
    delete formatted.clientOptions;
    delete formatted.engagementModelLevelOptions;
    delete formatted.engagementNameOptions;
    delete formatted.industryOptions;
    delete formatted.practiceOptions;
    delete formatted.staffingModelOptions;
    delete formatted.technologyOptions;

    // deleting technology key as CaseStudyTechnologies entries are made elsewhere
    delete formatted.technology;

    // adding keys that still need to be implemented

    // adding a username key that in the future, is likely to be authenticated
    formatted.userName = "emclaugh";

    // taking old values and renaming them to match the POST format for the RESTapi
    formatted.engagementSize = values.sizeOfEngagement;
    formatted.engagementDuration = values.durationOfEngagement;
    formatted.engagementRevenue = values.engagementValue;
    formatted.valueStatement = values.resultsAchieved;

    // merging together the formatted CaseStudy with the foundIds and returning this new JSON Object
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
   * Calls all other population methods. These population methods
   * call the [RESTapi] to populate Storage._data[clients, caseStudies, etc...]
   * with the proper format for being in a React dropdown menu
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
 * Any time {new DataHandler()} is called, this will return
 * an instance of the DataHandler class and not a new one.
 * This instance can then call gets and posts
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
   * @param {JSON} values
   * Takes in a JSON of [values] that contains caseStudy information
   * as well as all the options for dropdown menus for creating a caseStudy.
   *
   * Firstly, [values] is copied over into a variable named [formatted] through a
   * privateMethod called [fromatCaseStudy]. This removes all unnecessary details from the JSON object
   *
   * After formatting, this is passed to the [RESTapi] to be POST'd
   * What is returned is the new [caseStudyId] that has just been created.
   *
   * Finally, this is passed to a privateMethod called [postCaseStudyTechnologies]
   */
  submitCaseStudy = values => {
    var formatted = privateMethods.formatCaseStudy(values);

    // these two method calls are for testing and assurance purposes
    // This is to see what exactly is being passed to the RESTapi before anything is posted
    Storage.setCaseStudy(formatted);
    Storage.logCaseStudy();

    RESTapi.postCaseStudy(formatted).then(caseStudyId => {
      privateMethods.postCaseStudyTechnologies(values, caseStudyId);
    });
  };

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
}

export default DataHandler;
