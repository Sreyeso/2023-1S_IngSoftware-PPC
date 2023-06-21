import React, { Component } from "react";
import DBO from "@/lib/utils/dbo";
import UserModel from "@/lib/models/user";
import StatsModel from "@/lib/models/stats";
import Clients from "@/lib/models/user";
import styles from '../styles/boardstyle.module.css';
import PPCButton from "@/components/PPCButton";
import { withRouter, NextRouter } from 'next/router';

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


interface LeaderboardProps extends Clients{
  router: NextRouter;
  ranks: any[];
  userRank: number | undefined;
}

class Leaderboard extends Component<LeaderboardProps> {

  render() {
    const { ranks, userName, userRank, router } = this.props;

    async function logout() {
      await fetch('/api/getSessions', {
        method: "DELETE",
      })
      router.push('/login')
    }
    
    return (
      <div className={styles.all}>
        <div className={styles.board}>
          <h1 className={styles.leaderboard}>Rankings</h1>
          <Profiles datos={ranks} userName={userName} userRank={userRank} />
        </div>
        <div>
          <div className={styles.flex}>
          <div className={styles.buttoncontainer}>
            <PPCButton
              func={() => router.push("/profile")}
              image="sprites/generalAssets/PROFILE.png"
              st={{ width: '15%' }}
            />
            <PPCButton
              func={() => router.push("/game")}
              image="sprites/generalAssets/START GAME.png"
              st={{ width: '15%' }}
            />
            <PPCButton
              func={() => router.push("/stats")}
              image="sprites/generalAssets/STATS.png"
              st={{ width: '15%' }}
            />
            <PPCButton
              func={logout}
              image="sprites/generalAssets/LOG-OUT.png"
              st={{ width: '15%' }}
            />
          </div>
        </div>
        </div>
      </div>
    );
  }
}

export function Profiles({ datos, userName,userRank }: any) {
  // Filter out undefined elements
  const filteredDatos = datos.filter((dato: any) => dato !== undefined);
  return (
    <div className={styles.tablecontainer}>
      <table className={styles.table}>
        <tbody>
        {filteredDatos.map((data: any, index: number) => (
        <Item
          key={index}
          datos={data}
          number={index + 1}
          userName={userName}
          userRank={userRank}
        />
      ))}
        </tbody>
      </table>
      </div>
  );
}

function Item({ datos, number, userName, userRank }: any) {
  const isUser = datos.UserName === userName;
  const isTop10 = userRank !== -1;
  
  const itemStyle = {
    backgroundColor: isUser ? (isTop10 ? 'goldenrod' : 'lightblue') : 'default',
  };

  return (
    <tr className={styles.flex}>
      <td className={styles.item} style={itemStyle}>
        <div className={styles.itemcontent}>
          <div className={styles.itemnumber}>{isUser ? "Tú:" : number}</div>
          <div className={styles.fulluser}>
            <div className={styles.userhat}>
              <img src={`/sprites/allHats/${datos.CurrentAspect[1]}`} alt="userGorro" />
            </div>
            <div className={styles.userskin}>
              <img src={`/sprites/allSkins/${datos.CurrentAspect[0]}`} alt="userSkin" />
            </div>
          </div>
          <div className={styles.info}>
            <h3 className={isUser ? `${styles.useritem} ${styles.username}` : styles.userrank}>{datos.UserName}</h3>
            <div className={styles.region}>{datos.Region}</div>
          </div>
          <div className={styles.score}>Score: {datos.HiScore}</div>
        </div>
      </td>
    </tr>
  );
}

export default withRouter(Leaderboard);