import _ from "lodash";

export default class Storage {
  /**
   * Example format 
   * {
   *    "engagementName": "Global Atlantic",
        "businessProblem": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas turpis erat, porta a dolor sit amet, maximus commodo mauris. Nullam.",
        "solutionDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas turpis erat, porta a dolor sit amet, maximus commodo mauris. Nullam.",
        "industryId": 3,
        "practiceId": 2,
        "staffingDeliveryModelId": 2,
        "engagementRevenue": 210000,
        "engagementDuration": 36,
        "engagementSize": 3,
        "valueStatement": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas turpis erat, porta a dolor sit amet, maximus commodo mauris. Nullam.",
        "userName": "emclaugh",
        "clientId": 1
   * }
   */
  _caseStudy = {};

  /**
   * Example format
   * [
   *  {
   *    "technologyId": 5,
        "caseStudyId": 1
   *  },
      {
        "technologyId": 14,
        "caseStudyId": 1
      }
   * 
   * ]
   */
  _cstech = [];
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
}
