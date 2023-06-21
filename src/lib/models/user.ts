import { Collection, Db, ObjectId,Document} from "mongodb";

export interface Clients extends Document {
  UserName: string;
  Password: string;
  Mail: number;
  Gender: string;
  Region: string;
  GemAmount: number;
  CoinAmount: number;
  HiScore: number;
  CurrentAspect: string;
  GachaObjects: string[];
}

export default class UserModel{
  userName:string="";
  AllCoins:number=0;
  AllGems:number=0;
  skinCount:number=0;
  hatCount:number=0;
  collection:any;
  userCoins:number=0;
  userGems:number=0;
  userSkin:string[]=["default_ppc.png","none.png"];
  gachaObjects:string[][]=[["default_ppc.png"],["none.png"]];
  maxScore:number=0;

  constructor(db:Db) {
    this.collection = db.collection('Clients');
  }

 /**
 *  Adds a new user to the database
 * @param {Array}  user - An array with all of the properties of the user (Look for the Clients interface for all fields)
 * @returns {string} returns the database response
 */
 async addUser(user: any[]) {
  const newUser = this.collection.insertOne({
    UserName: user[0],
    Password: user[1],
    Mail: user[2],
    Gender: user[3],
    Region: user[4],
    GemAmount: user[5],
    CoinAmount: user[6],
    HiScore: user[7],
    CurrentAspect: ["default_ppc.png","none.png"],
    GachaObjects: [["default_ppc.png"],["none.png"]],
  });
  return newUser;
}

  /**
 *  Gets an object user from the database
 * @param {string}  user - Give the UserName to find the document
 * @returns {Object} Returns the object user, call the properties to get the individual values
 */
  async getUser(user: string) {
    const findUser = this.collection.findOne({ UserName: user }, { projection: { _id: 0 } });
    return findUser;
  }


  async getSkinsPercent(user:string){
    const skins = this.collection.aggregate([{$match: {UserName: user}},{$project: {_id: 0,innerArrayLength: { $size: { $arrayElemAt: ["$GachaObjects", 0] } }}}]).toArray();
    return skins;
  }

  async getHatsPercent(user:string){
    const hats = this.collection.aggregate([{$match: {UserName: user}},{$project: {_id: 0,innerArrayLength: { $size: { $arrayElemAt: ["$GachaObjects", 1] } }}}]).toArray();
    return hats;
  }

  async verifyMail(mail: string){
    const findMail = this.collection.findOne({Mail: mail});
    return findMail;
  }
  async setScore(user:string,score:number){
    const  nuScore= this.collection.updateOne({UserName:user},{$set: {HiScore:score}});
    return nuScore;
  }
  
  async setAspect(user: string, skin: string, hat: string) {
    const nuAspect = this.collection.updateOne(
      { UserName: user },
      { $set: { CurrentAspect: [skin, hat] } }
    );
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

  async addGachaSkin(user: string, gachaSkin: string) {
    const result = await this.collection.updateOne(
      { UserName: user },
      { $addToSet: { 'GachaObjects.0': gachaSkin } }
    );
    return result;
  }

  async addGachaHat(user: string, gachaHat: string) {
    const result = await this.collection.updateOne(
      { UserName: user },
      { $addToSet: { 'GachaObjects.1': gachaHat } }
    );
    return result;
  }

  async deleteUser(user:string){
    const deletedUser = await this.collection.deleteOne({UserName:user})
    console.log(deletedUser)
    return deletedUser;
  }

}

