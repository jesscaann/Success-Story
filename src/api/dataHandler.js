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
  populateEngagementModelLevels() {
    RESTapi.getEngagementModelLevels().then(res => {
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
  populateDATA: () => {
    privateMethods.populateClients();
    privateMethods.populateEngagementNames();
    privateMethods.populateIndustries();
    privateMethods.populateTechnologies();
    privateMethods.populatePractices();
    privateMethods.populateEngagementModelLevels();
    privateMethods.populateStaffingModels();
    privateMethods.populateCaseStudyTechnologies();
    privateMethods.populateCaseStudies();
    return "success";
  },
  /**
   * This takes in a [table] and searches _data for that particular key
   *
   * From there, it parses through the array of JSON entries to find if the [value]
   * is in the entry. If so, it will return the ID of the entry. Otherwise, we can
   * return a null or 0.
   *
   * @param {String} table
   * @param {String} value
   */
  findId: (table, value) => {},
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
   *  - Take the
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
   */
  formatCaseStudy(values) {
    // Copy values into newEntry
    var newEntry = JSON.parse(JSON.stringify(values));

    // each of these has to be a search to return the correct ids

    var foundIds = {
      clientId: privateMethods.findId("clients", newEntry.client),
      industryId: privateMethods.findId("industries", newEntry.industry),
      practiceId: privateMethods.findId("practices", newEntry.practice),
      staffingModelId: privateMethods.findId(
        "staffingDeliveryModels",
        newEntry.staffingDeliveryModel
      ),
      // this one will break since the key is called engagementModel everywhere instead of engagementModelLevel
      engagementModelId: privateMethods.findId(
        "engagementModelLevels",
        newEntry.engagementModelLevel
      )
    };

    return newEntry;
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
    }
    return DataHandler.instance;
  }

  /**
   * Takes in a JSON of values calls a formatting function
   *
   * Once found, these IDs are placed into the [entry] JSON
   * which is then POST'd throug the RESTapi to the database
   * @param {JSON} values
   */
  submitCaseStudy = values => {
    var entry = privateMethods.formatCaseStudy(values);

    RESTapi.postCaseStudy(entry).then(res => {
      // pull new caseStudyId
      // call method to make appropriate caseStudyTechnolgies POST's
      // .then(_=>{this.refreshData()});

      this.refreshData();
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
    return JSON.parse(JSON.stringify(_data[key]));
  };

  /**
   * Makes a deep copy of the _data and
   * returns this JSON
   */
  toJSON = _ => {
    return JSON.parse(JSON.stringify(_data));
  };

  /**
   * Pulls data from the database and updates local
   * _data snapshot
   */
  refreshData = async () => {
    await privateMethods.populateDATA();
  };

  /**
   * This takes in a [key] and searches _data for that particular key
   *
   * From there, it parses through the array of JSON entries to find if the [value]
   * is in the entry. If so, it will return the ID of the entry. Otherwise, we can
   * return a null or 0.
   *
   * @param {String} key
   * @param {String} value
   */
  findId = (key, value) => {
    privateMethods.findId(key, value);
  };
}

export default DataHandler;
