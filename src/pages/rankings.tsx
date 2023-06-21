import React, { Component } from "react";
import DBO from "@/lib/utils/dbo";
import UserModel from "@/lib/models/user";
import StatsModel from "@/lib/models/stats";
import Clients from "@/lib/models/user";
import "@/styles/boardstyle.css"

export async function getServerSideProps(ctx: { req: any; }) {
  let DB: DBO | null = null;
  let isConnected = false;
  let userCoins = 0;
  let userGems = 0;
  let userSkin = 0;
  let maxScore = 0;
  let region = "Base";
  let ranks = [];
  let userRank;
  try {
    DB = new DBO();
    const UDO = new UserModel(DB.db);
    const SDO = new StatsModel(DB.db);
    const { req } = ctx;
    const userName: string = req.headers.user;

    let userData = await UDO.getUser(userName);
    let ranksUsers = await SDO.getTop();

    if (userData) {
      userCoins = userData.CoinAmount;
      userGems = userData.GemAmount;
      userSkin = userData.CurrentAspect[0];
      maxScore = userData.HiScore;
      isConnected = true;
      region = userData.Region;
    } else {
      console.log("ERROR FETCHING USER DATA");
    }

    if (ranksUsers) {
      ranks = ranksUsers.map((user: any) => {
        const { _id, ...rest } = user;
        return rest;
      });

      // Truncate the ranks array to the first 10 elements
      ranks = ranks.slice(0, 10);

      // Find the user's rank in the ranks array
      const userIndex = ranks.findIndex((user: any) => user.UserName === userName);

      if (userIndex === -1) { // User is not in the top 10
        ranks.push(userData); // Add the user's data to the end of the ranks array
        userRank = -1;
      } else { // User is in the top 10
        userRank = userIndex + 1;
      }
    }

    return {
      props: { ranks,userName,userRank},
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected },
    };
  } finally {
    if (DB) {
      DB.end();
    }
  }
}

//tuto tomado de: https://www.youtube.com/watch?v=p_046Qe19p0

export default class Leaderboard extends Component<Clients> {
  render() {
    const { ranks, userName,userRank } = this.props;

    return (
      <div>
        <div className="board">
          <h1 className="leaderboard">Rankings</h1>
          <Profiles datos={ranks} userName={userName} userRank={userRank} />
        </div>
        <div>
          <button>
            <img src="/sprites/generalAssets/LOG-OUT.png" alt="Logout" />
          </button>
          <button>
            <img src="/sprites/generalAssets/PROFILE.png" alt="Perfil" />
          </button>
          <a href="\leaderboard">
            <button>
              <img src="./sprites/generalAssets/RANKINGS.png" alt="Rankings" />
            </button>
          </a>
          <a href="\stats">
            <button>
              <img src="/sprites/generalAssets/GACHA.png" alt="Gacha" />
            </button>
          </a>
        </div>
      </div>
    );
  }
}

export function Profiles({ datos, userName,userRank }: any) {
  // Filter out undefined elements
  const filteredDatos = datos.filter((dato: any) => dato !== undefined);
  return (
    <div id="profile">
      {filteredDatos.map((data: any, index: number) => (
        <Item
          key={index}
          datos={data}
          number={index + 1}
          userName={userName}
          userRank={userRank}
        />
      ))}
    </div>
  );
}

function Item({ datos, number, userName, userRank }: any) {
  const isUser = datos.UserName === userName;
  const isTop10 = userRank !== -1;

  const itemStyle = {
    backgroundColor: isUser ? (isTop10 ? 'red' : 'blue') : 'default',
  };

  return (
    <div className="flex">
      <div className="item" style={itemStyle}>
        <h1>{isUser ? 'Tú:' : number}</h1>
        <div className="fulluser">
          <img src={`/sprites/allHats/${datos.CurrentAspect[1]}`} alt="userGorro" />
          <img src={`/sprites/allSkins/${datos.CurrentAspect[0]}`} alt="userSkin" />
        </div>
        <div className="info">
          <h3 className={isUser ? 'user-item' : 'user-rank'}>{datos.UserName}</h3>
          <span>Región: {datos.Region}</span>
        </div>
      </div>
      <div className="item">
        <span className={isUser ? '' : 'below-top-10'}>Score: {datos.HiScore}</span>
      </div>
    </div>
  );
}
