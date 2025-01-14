const oracledb = require("oracledb");
const loadEnvFile = require("./utils/envUtil");

const envVariables = loadEnvFile("./.env");

// this is the file we are going to be making SQL connections form

// Database configuration setup. Ensure your .env file has the required database credentials.
const dbConfig = {
  // user: "ora_sophsong",
  // password: "a48161814",
  user: envVariables.ORACLE_USER,
  password: envVariables.ORACLE_PASS,
  connectString: `${envVariables.ORACLE_HOST}:${envVariables.ORACLE_PORT}/${envVariables.ORACLE_DBNAME}`
  // connectString: `${envVariables.ORACLE_HOST}:${envVariables.ORACLE_PORT}/${envVariables.ORACLE_DBNAME}`,
  // connectString: 'localhost:50000/stu'
};
usernum = 12;

// ----------------------------------------------------------
// Wrapper to manage OracleDB actions, simplifying connection handling.
async function withOracleDB(action) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    return await action(connection);
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

// ----------------------------------------------------------
// Core functions for database operations
// Modify these functions, especially the SQL queries, based on your project's requirements and design.
async function testOracleConnection() {
  return await withOracleDB(async (connection) => {
    return true;
  }).catch(() => {
    return false;
  });
}

async function getAllTables() {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(`select table_name from user_tables`);
    const rows = result.rows;
    return rows;
    // return rows;
  }).catch(() => {
    return [];
  });
}

async function getAllAttributesOfTable(selectedTable) {

  return await withOracleDB(async (connection) => {
    const query = `select * from ${selectedTable}`;

    const result = await connection.execute(query);
    
    const rows = result;
    return rows;
  }).catch(() => {
    return [];
  });

}

async function projectionQuery(selectedTable, queryAttributes) {
  // selected table is a string 
  // queryAttributes is an array 

  const selectAttributes = queryAttributes.join(', ');
  const query = `SELECT ${selectAttributes} FROM ${selectedTable}`;

  return await withOracleDB(async (connection) => {
    const result = await connection.execute(query);
    const rows = result;
    return rows;
  }).catch(() => {
    return [];
  });

}


async function fetchAllGamesFromDb() {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(`SELECT * FROM Game`);
    const rows = result.rows;

    const gameData = rows.map((row) => {
      return {
        gameId: row[0],
        title: row[1],
        genre: row[2],
        ageRestriction: row[3],
        releaseDate: row[4],
        platform: row[5],
        leaderboardID: row[6],
      };
    });

    return gameData;
    // return rows;
  }).catch(() => {
    return [];
  });
}

async function getGamePublisher() {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(`
        SELECT publisherName FROM publisher
        `);

    return result.rows;
  }).catch(() => {
    return false;
  });
}

async function countGamestable() {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute("SELECT Count(*) FROM Game");
    return result.rows[0][0];
  }).catch(() => {
    return -1;
  });
}

// async function getAllPublishersGames() {
//   return await withOracleDB(async (connection) => {
//     const result = await connection.execute('SELECT pb.PublisherID, pb.publisherName, g.GameID, Title, Genre, releaseDate, platform FROM publisher pb, publishes p, game g WHERE pb.publisherID = p.publisherID AND g.gameID = p.gameID')
//     // const result = await connection.execute("");

//     const rows = result.rows;

//     const publisherGameData = rows.map(row => {
//         return {
//             publisherId: row[0],
//             publisherName: row[1],
//             gameId: row[2],
//             title: row[3],
//             genre: row[4],
//             releaseDate: row[5],
//             platform: row[6]
//         };
//     });
//     return publisherGameData;
//   }).catch(() => {
//     return [];
//   });
// }

async function getGenreStatistic() {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      "select genre, count(*) as game_count from game group by genre"
    );

    const rows = result.rows;

    return rows;
  }).catch(() => {
    return [];
  });
}

async function getGenreStatisticDifficulty() {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      "SELECT g.genre, AVG(sg.difficulty) AS average_difficulty FROM game g JOIN singleplayergame sg ON g.gameid = sg.gameid GROUP BY g.genre HAVING AVG(sg.difficulty) > 3.0"
    );
    const rows = result.rows;

    return rows;
  }).catch(() => {
    return [];
  });
}

async function getNestedAggregationQuery() {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      "SELECT max(avgDif) FROM (SELECT genre, avg(difficulty) AS avgDif FROM SinglePlayerGame spg INNER JOIN Game ON spg.gameID = Game.gameID GROUP BY Genre)"
    );
    const rows = result.rows;

    return rows;
  }).catch(() => {
    return [];
  });
}



async function countPublishersWithGamestable() {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `SELECT count(*) FROM publisher pb, publishes p, game g WHERE pb.publisherID = p.publisherID AND g.gameID = p.gameID`
    );
    return result.rows[0][0];
  }).catch(() => {
    return -1;
  });
}

async function insertNewUser(email, dob) {
  return await withOracleDB(async (connection) => {
    usernum = usernum + 1

    const result = await connection.execute(
      `INSERT INTO Player (playerID, playerEmail, dateOfBirth, rank, avatar, bio) VALUES (:usernum, :email, TO_DATE(:dob, 'DD-MM-YYYY'), 0, '/path/to/default.jpg', 'Click button to edit here!')`,
      [usernum, email, dob],
      { autoCommit: true }
    )

    return true;
  }).catch(() => {
    return false;
  });
}


async function getUserBio(newBio, email) {
  return await withOracleDB(async (connection) => {

    const oldBio = await connection.execute('select bio from player where playerEmail=:email', [email], {autoCommit: true});

    const result = await connection.execute(
      `UPDATE Player SET bio=:newBio WHERE playerEmail=:email`,
      [newBio, email],
      { autoCommit: true }
    );

    return oldBio;
  }).catch(() => {
    return false;
  });
}

async function updateUser(newBio, email) {
  return await withOracleDB(async (connection) => {

    const oldBio = await connection.execute('select bio from player where playerEmail=:email', [email], {autoCommit: true});

    const result = await connection.execute(
      `UPDATE Player SET bio=:newBio WHERE playerEmail=:email`,
      [newBio, email],
      { autoCommit: true }
    );

    return oldBio;
  }).catch(() => {
    return false;
  });
}

async function currentUser(email) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `SELECT * FROM player WHERE playeremail=:email`,
      [email],
      { autoCommit: true }
    );

    return result.rows;
  }).catch(() => {
    return [];
  });

}

async function getAllPublishersGames(selectedOption) {
    return await withOracleDB(async(connection) => {
      const whereConditions = selectedOption.length > 0 ? selectedOption.map((option) => `g.genre = '${option}'`).join(' OR ') : '';

      const query = `
        SELECT
          d.developerName,
          pb.publisherName,
          g.GameID,
          Title,
          Genre,
          releaseDate,
          platform
        FROM
          developercompany d,
          developergame dv,
          publisher pb,
          publishergame p,
          game g
        WHERE
          pb.publisherID = p.publisherID
          AND g.gameID = p.gameID
          AND d.developerid = dv.developerid
          AND dv.gameid = g.gameid
          AND (${whereConditions})
      `;
        const result = await connection.execute(query)

        const rows = result.rows;
        const publisherGameData = rows.map(row => {
            return {
                companyName: row[0],
                publisherName: row[1],
                gameId: row[2],
                title: row[3],
                genre: row[4],
                releaseDate: row[5],
                platform: row[6]
            };
        });
        return publisherGameData;
    }).catch(() => {
        return [];
    });
}

async function getGenreStatistic() {
    return await withOracleDB(async(connection) => {
        const result = await connection.execute('select genre, count(*) as game_count from game group by genre')

        const rows = result.rows;
    
        return rows;
    }).catch(() => {
        return [];
    });
}

async function getGenreStatisticDifficulty() {
    return await withOracleDB(async(connection) => {
        const result = await connection.execute('SELECT g.genre, AVG(sg.difficulty) AS average_difficulty FROM game g JOIN singleplayergame sg ON g.gameid = sg.gameid GROUP BY g.genre')
        const rows = result.rows;
    
        return rows;
    }).catch(() => {
        return [];
    });
}


async function countPublishersWithGamestable() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(`SELECT count(*) FROM publisher pb, publishes p, game g WHERE pb.publisherID = p.publisherID AND g.gameID = p.gameID`);
        return result.rows[0][0];
    }).catch(() => {
        return -1;
    });
}

async function getTitleGameForAllPlayers() {
  return await withOracleDB(async (connection) => {
      const result = await connection.execute(`
            SELECT g.title
            FROM Game g
            WHERE NOT EXISTS (
            SELECT p.playerID
            FROM Player p
            MINUS
            SELECT gp.playerID
            FROM GamePlayer gp
            WHERE gp.gameID = g.gameID)`);

      return result.rows;
  }).catch(() => {
      return [];
  });
}

async function getGameRatedEforEveryone() {
  return await withOracleDB(async (connection) => {
      const result = await connection.execute(`
      SELECT ga.title, ga.genre
      FROM Genre ge
      JOIN Game ga ON ge.genre = ga.genre
      WHERE ge.ageRestriction = 'E'`);

      return result.rows;
  }).catch(() => {
      return [];
  });
}






module.exports = {
    testOracleConnection,
    fetchAllGamesFromDb,
    getGenreStatistic,
    getGenreStatisticDifficulty,
    insertNewUser,
    updateUser,
    currentUser,
    getAllTables,
    getAllAttributesOfTable,
    projectionQuery,
    getNestedAggregationQuery,
    getTitleGameForAllPlayers,
    getGameRatedEforEveryone,
    // initiateDemotable, 
    // insertDemotable, 
    // updateNameDemotable, 
    countGamestable,
    getAllPublishersGames,
    countPublishersWithGamestable
};