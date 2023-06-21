import { Collection, Db, ObjectId,Document} from "mongodb";

export interface SessionManager extends Document {
  Name:string;
  Session_id:string;
}

export default class SessionModel{
  collection:any;
  userName:string='';
  sessionId:string='';

  constructor(db:Db) {
    this.collection = db.collection('SessionManager');
  }


/**
 *  Adds a new user to the database
 * @param {Array}  session - An array with all of the properties of the session (Look for the SessionManager interface for all fields)
 * @returns {string} returns the database response
 */


 async addSession(session: any[]) {
  const newSession = this.collection.insertOne({
    UserName: session[0],
    sessionId: session[1]
  });
  return newSession;
 }

  /**
 *  Gets an object user from the database
 * @param {string}  user - Give the UserName to find the document
 * @returns {Object} Returns the object user, call the properties to get the individual values
 */
  async getSessionbyHash(sessionid:string){
    const  findbyHash= this.collection.findOne({sessionId:sessionid});
    return findbyHash;
  }
  async getSessionbyUser(user:string){
    const  findbyUser= this.collection.findOne({UserName:user});
    return findbyUser;
  }

  async deleteSessionByHash(sessionId:string){
    const deletedUser = this.collection.deleteMany({sessionId:sessionId})
    return deletedUser;
  }


}