import { Collection, Db, ObjectId,Document} from "mongodb";

export interface Clients extends Document{
  username: string;
  password: string;
  mail: number;
  gender: string;
  region: string;
  gemamount: number;
  coinamount: number;
  hiscore: number;
  currentaspect: string;
  gachaobjects: string[];
}

export default class UserModel {
  collection:Collection;
  constructor(db:Db) {
    this.collection = db.collection<Clients>('Clients');
  }

 /**
 *  Adds a new user to the database
 * @param {Array}  user - An array with all of the properties of the user (Look for the Clients interface for all fields)
 * @returns {string} returns the database response
 */
  async addUser(user:any[]) {
    const newUser = this.collection.insertOne({
      UserName: user[0],
      Password: user[1],
      Mail: user[2],
      Gender: user[3],
      Region: user[4],
      GemAmount: user[5],
      CoinAmount: user[6],
      HiScore: user[7],
      CurrentAspect: "default",
      GachaObjects:["default"],
    });
    //newUser es un objeto, tiene props como newUser.insertedId, usar para verificación
    return newUser;
  }
  /**
 *  Gets an object user from the database
 * @param {string}  user - Give the UserName to find the document
 * @returns {Object} Returns the object user, call the properties to get the individual values
 */
  async getUser(user:string){
    const  findUser= this.collection.findOne({UserName:user});
    return findUser;
  }
  async verifyMail(){

  }
  async setScore(user:string,score:number){
    const  nuScore= this.collection.updateOne({UserName:user},{$set: {HiScore:score}});
    return nuScore;
  }
  async setAspect(user:string,aspect:string){
    const  nuAspect= this.collection.updateOne({UserName:user},{$set: {CurrentAspect:aspect}});
    return nuAspect;
  }
  async addCoins(user:string,amount:number){
    const  inCoins= this.collection.updateOne({UserName:user},{$inc: {CoinAmount:amount}});
    return inCoins;
  }
  async addGems(user:string,amount:number){
    const  inGems= this.collection.updateOne({UserName:user},{$inc: {GemAmount:amount}});
    return inGems;
  }
  /*
  async getAspect(skinname:string){
    const currentAspect=
  }*/

}

