import { Db, MongoClient } from 'mongodb'
/**
 *  Database object, DONT FORGET TO CLOSE IT SOMEWHERE
 * @property {Function} init - Part of constructor, starts connection
 * @property {Function} ends the connections
 */
export default class DBO {
  /** @type {MongoClient} */
  client:MongoClient;
  db:Db;
  options:any;
  test:string="";
  constructor() {
    if (!process.env.MONGODB_URI) {
      throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
    }
    const uri = process.env.MONGODB_URI
    this.client = new MongoClient(uri, this.options);
    this.init();
    this.db = this.client.db("PolloRunner");
  }
  /**
 *  Closes the DB connection IMPORTANT
 * @returns {string} returns the database response
 */
  async end() {
    await this.client.close();
    console.log('disconnected');
  }
  /**
 *  Initialize the DB connection
 * @returns {string} returns the database response to connection
 */
  async init() {
    await this.client.connect();
  }
}

