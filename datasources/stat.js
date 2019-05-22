const { DataSource } = require('apollo-datasource');

class StatAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }
  initialize(config) {
    this.context = config.context;
  }
  async findOrCreateStat({ })

}
