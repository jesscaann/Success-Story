import RESTapi from "./restapi";

var _data = {};

const privateMethods = {
  populateClients() {
    RESTapi.getClients().then(res => {
      _data.clients = res;
      console.log(_data.clients);
    });
  },
  populateEngagementNames() {
    RESTapi.getEngagementNames().then(res => {
      _data.engagementNames = res;
      console.log(_data.engagementNames);
    });
  },
  populateDATA() {
    privateMethods.populateClients(); // hope
    privateMethods.populateEngagementNames();
  }
};

class DATA {
  constructor() {
    if (!DATA.instance) {
      DATA.instance = this;
      privateMethods.populateDATA();
    }

    return DATA.instance;
  }

  getClients() {
    return JSON.parse(JSON.stringify(_data.clients));
  }

  getEngagementNames() {
    return JSON.parse(JSON.stringify(_data.engagementNames));
  }
  //rest is the same code as preceding example
}

export default DATA;
