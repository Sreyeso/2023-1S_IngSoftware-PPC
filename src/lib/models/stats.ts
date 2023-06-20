import { Collection, Db, Document } from "mongodb";

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

export default class StatsModel {
  collection: Collection<Clients>;

  constructor(db: Db) {
    this.collection = db.collection("Clients");
  }

  async getAllCoins() {
    const globalCoins = this.collection
      .aggregate([
        {
          $group: {
            _id: "",
            CoinAmount: { $sum: "$CoinAmount" },
          },
        },
        {
          $project: {
            _id: 0,
            TotalCoins: "$CoinAmount",
          },
        },
      ])
      .toArray();
    return globalCoins;
  };

  async getAllGems() {
    const globalGems = this.collection
      .aggregate([
        {
          $group: {
            _id: "",
            GemAmount: { $sum: "$GemAmount" },
          },
        },
        {
          $project: {
            _id: 0,
            TotalGems: "$GemAmount",
          },
        },
      ])
      .toArray();
    return globalGems;
  };

  async getTop() {
    const top10 = await this.collection
      .find(
        {},
        {
          projection: {
            _id: 0,
            UserName: 1,
            Region: 1,
            HiScore: 1,
            CurrentAspect: 1,
          },
        }
      )
      .sort({ HiScore: -1 })
      .limit(10)
      .toArray();

    return top10;
  }
}
