import DataHandler from "./dataHandler";

var _ = require("lodash");

export default class Storage {
  _caseStudy = {};
  _data = {};

  static init() {
    this._data = {};
    this._caseStudy = {};
  }

  static setCaseStudy = caseStudy => {
    this._caseStudy = JSON.parse(JSON.stringify(caseStudy));
  };
  static setData = data => {
    this._data = JSON.parse(JSON.stringify(data));
  };

  static logCaseStudy = () => {
    console.log(JSON.parse(JSON.stringify(this._caseStudy)));
  };

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
   * @param {Object} values
   */
  static formatCaseStudy = values => {
    // Copy values into newEntry
    var newEntry = JSON.parse(JSON.stringify(values));

    // each of these has to be a search to return the correct ids

    var foundIds = {
      clientId: Storage.findId("clients", newEntry.clientName),
      industryId: Storage.findId("industries", newEntry.industry),
      practiceId: Storage.findId("practices", newEntry.practice),
      staffingModelId: Storage.findId(
        "staffingDeliveryModels",
        newEntry.staffingModel
      ),
      // this one will break since the key is called engagementModel everywhere instead of engagementModelLevel
      engagementModelId: Storage.findId(
        "engagementModelLevels",
        newEntry.engagementModelLevel
      )
    };

    console.log(foundIds);

    delete newEntry.clientName;
    delete newEntry.industry;
    delete newEntry.practice;
    delete newEntry.engagementModelLevel;
    delete newEntry.staffingModel;

    return _.merge(newEntry, foundIds);
  };
}
