const oracledb = require("oracledb");
const loadEnvFile = require("./utils/envUtil");

const envVariables = loadEnvFile("./.env");

// this is the file we are going to be making SQL connections form

// Database configuration setup. Ensure your .env file has the required database credentials.
const dbConfig = {
  user: envVariables.ORACLE_USER,
  password: envVariables.ORACLE_PASS,
  connectString: `${envVariables.ORACLE_HOST}:${envVariables.ORACLE_PORT}/${envVariables.ORACLE_DBNAME}`,

};

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
    const result = await connection.execute("SELECT * FROM Game");
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

async function updateNameDemotable(oldName, newName) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `UPDATE DEMOTABLE SET name=:newName where name=:oldName`,
      [newName, oldName],
      { autoCommit: true }
    );

    return result.rowsAffected && result.rowsAffected > 0;
  }).catch(() => {
    return false;
  });
}

async function countDemotable() {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute("SELECT Count(*) FROM DEMOTABLE");
    return result.rows[0][0];
  }).catch(() => {
    return -1;
  });
}

module.exports = {
  testOracleConnection,
  fetchAllGamesFromDb,
  getGamePublisher,
  // insertNewUser,
  // initiateDemotable,
  // insertDemotable,
  // updateNameDemotable,
  // countDemotable
};
