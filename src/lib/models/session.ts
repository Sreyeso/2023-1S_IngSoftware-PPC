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
}