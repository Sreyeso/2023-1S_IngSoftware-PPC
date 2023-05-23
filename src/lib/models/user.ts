import { Collection, Db, ObjectId,Document} from "mongodb";

export interface Clients extends Document{
  username: string;
  password: string;
  mail: number;
  bdate: string;
  gender: string;
  region: string;
  gemamount: number;
  coinamout: number;
  hiscore: number;
  currentaspect: string;
  gachaobjects: ObjectId[];
}

export default class UserModel {
  collection:Collection;
  constructor(db:Db) {
    this.collection = db.collection<Clients>('Clients');
  }
  async addUser(user:any[]) {
    const newUser = this.collection.insertOne(user);
    return newUser;
  }
  async getUser(user:string){
    const  findUser= this.collection.findOne({UserName:user});
    return findUser;
  }
  async verifyMail(){

  }
  async addCoins(user:string,amount:number){
    const  inCoins= this.collection.updateOne({UserName:user},{$inc: {coinamount:amount}});
    return inCoins;
  }
  /*
  async getAspect(skinname:string){
    const currentAspect=
  }*/

}

