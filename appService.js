const oracledb = require('oracledb');
const loadEnvFile = require('./utils/envUtil');

const envVariables = loadEnvFile('./.env');

// this is the file we are going to be making SQL connections form 

// Database configuration setup. Ensure your .env file has the required database credentials.
const dbConfig = {
    // explicitly named user, pass, host, dbname, etc.
    user: "ora_sophsong",
    password: "a48161814",
    // connectString: "dbhost.students.cs.ubc.ca:1522/stu"
    // user: envVariables.ORACLE_USER,
    // password: envVariables.ORACLE_PASS,
    connectString: `${envVariables.ORACLE_HOST}:${envVariables.ORACLE_PORT}/${envVariables.ORACLE_DBNAME}`
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
        const result = await connection.execute(`SELECT * FROM Game`);
        const rows = result.rows;

        const gameData = rows.map(row => {
            return {
                gameId: row[0],
                title: row[1],
                genre: row[2],
                ageRestriction: row[3],
                releaseDate: row[4],
                platform: row[5],
                leaderboardID: row[6]
            };
        });

        return gameData;
        // return rows;
    }).catch(() => {
        return [];
    });
}

async function initiateDemotable() {
    return await withOracleDB(async (connection) => {
        try {
            await connection.execute(`DROP TABLE DEMOTABLE`);
        } catch(err) {
            console.log('Table might not exist, proceeding to create...');
        }

        const result = await connection.execute(`
            CREATE TABLE DEMOTABLE (
                id NUMBER PRIMARY KEY,
                name VARCHAR2(20)
            )
        `);
        return true;
    }).catch(() => {
        return false;
    });
}

async function insertDemotable(id, name) {
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

async function countGamestable() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT Count(*) FROM Game');
        return result.rows[0][0];
    }).catch(() => {
        return -1;
    });
}

async function getAllPublishersGames() {
    return await withOracleDB(async(connection) => {
        const result = await connection.execute('SELECT pb.PublisherID, pb.publisherName, g.GameID, Title, Genre, releaseDate, platform FROM publisher pb, publishes p, game g WHERE pb.publisherID = p.publisherID AND g.gameID = p.gameID')
        const rows = result.rows;
        // console.log(rows);
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
    // initiateDemotable, 
    // insertDemotable, 
    // updateNameDemotable, 
    countGamestable,
    getAllPublishersGames,
    countPublishersWithGamestable
};