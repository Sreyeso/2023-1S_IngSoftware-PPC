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
 async addSession(session: any[]) {
  const newSession = this.collection.insertOne({
    UserName: session[0],
    sessionId: session[1]
  });
  return newSession;
 }
}