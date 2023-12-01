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

async function insertNewUser(username, pword) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `INSERT INTO DEMOTABLE (id, name) VALUES (:id, :name)`,
      [id, name],
      { autoCommit: true }
    );

    return result.rowsAffected && result.rowsAffected > 0;
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

async function getAllPublishersGames() {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute('SELECT pb.PublisherID, pb.publisherName, g.GameID, Title, Genre, releaseDate, platform FROM publisher pb, publishes p, game g WHERE pb.publisherID = p.publisherID AND g.gameID = p.gameID')
    // const result = await connection.execute("");

    const rows = result.rows;

    const publisherGameData = rows.map(row => {
        return {
            publisherId: row[0],
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

async function getGenreStatisticDiffiuclty() {
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
      `INSERT INTO Player (playerID, playerEmail, dateOfBirth, rank, avatar, bio) VALUES (:usernum, :email, TO_DATE(:dob, 'DD-MM-YYYY'), 0, '/path/to/default.jpg', 'Feel free to change bio')`,
      [usernum, email, dob],
      { autoCommit: true }
    );

    return true;
  }).catch(() => {
    return false;
  });
}

async function updateUser(newBio) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `UPDATE Player SET bio=:newBio WHERE playerEmail='grace@gmail.com'`,
      [newBio],
      { autoCommit: true }
    );

    return result.rowsAffected && result.rowsAffected > 0;
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

async function getAllPublishersGames() {
    return await withOracleDB(async(connection) => {
    
        // const result = await connection.execute('SELECT d.companyid, d.companyName, pb.PublisherID, pb.publisherName, g.GameID, Title, Genre, releaseDate, platform FROM developercompany d, develops dv, publisher pb, publishes p, game g WHERE pb.publisherID = p.publisherID AND g.gameID = p.gameID AND d.companyid = dv.companyid AND dv.gameid = g.gameid')
        const result = await connection.execute('SELECT d.companyName, p.publisherName, game.GameID, game.Title, game.Genre, game.releaseDate, game.platform FROM game LEFT JOIN (SELECT * FROM develops INNER JOIN developercompany ON develops.companyid = developercompany.companyid) d ON d.gameId = game.gameId LEFT JOIN (SELECT * FROM publishes INNER JOIN publisher ON publishes.publisherid = publisher.publisherid) p ON p.gameId = game.gameId')

        const rows = result.rows;
        // console.log(rows);
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

module.exports = {
    testOracleConnection,
    fetchAllGamesFromDb,
    getGenreStatistic,
    getGenreStatisticDifficulty,
    insertNewUser,
    updateUser,
    currentUser,
    // initiateDemotable, 
    // insertDemotable, 
    // updateNameDemotable, 
    countGamestable,
    getAllPublishersGames,
    countPublishersWithGamestable
};