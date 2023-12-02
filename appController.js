const express = require('express');
const appService = require('./appService');

const router = express.Router();

// ----------------------------------------------------------
// API endpoints
// Modify or extend these routes based on your project's needs.
// these are things that will be called by the frontend 

// GET REQUESTS
router.get('/check-db-connection', async (req, res) => {
    const isConnect = await appService.testOracleConnection();
    if (isConnect) {
        res.send('connected');
    } else {
        res.send('unable to connect');
    } 
});

// Projection API Endpoints 
router.get('/tables', async (req, res) => {
    const tableContent = await appService.getAllTables();
    res.json({data: tableContent});
});

router.get('/attributes', async (req, res) => {
    const { selectedTable } = req.query;
    const tableContent = await appService.getAllAttributesOfTable(selectedTable);
    res.json({data: tableContent});
});

router.get('/projectionQuery', async (req, res) => {
    // need to get some things such as the table that it is querying from, and the list of attributes it needs 
   
    const { selectedTable, queryAttributes } = req.query;
    const tableContent = await appService.projectionQuery(selectedTable, queryAttributes);
    res.json({data: tableContent});
});

router.get('/nestedQuery', async (req, res) => {
    // need to get some things such as the table that it is querying from, and the list of attributes it needs 
    const tableContent = await appService.getNestedAggregationQuery();
    
    res.json({data: tableContent});
});

router.get('/games', async (req, res) => {
    const tableContent = await appService.fetchAllGamesFromDb();
    res.json({data: tableContent});
});

router.get('/publishers', async(req, res) => {  
    const { selectedOption } = req.query;
    const tableContent = await appService.getAllPublishersGames(selectedOption);
    res.json({data:tableContent});
});

router.get('/genre', async(req, res) => {  
    const tableContent = await appService.getGenreStatistic();
    res.json({data:tableContent});
});

router.get('/genre-difficulty', async(req, res) => {  
    const tableContent = await appService.getGenreStatisticDifficulty();
    
    res.json({data:tableContent});
});

router.get('/gamescount', async(req, res) => {  
    const tableContent = await appService.countGamestable();
    res.json({data:tableContent});
});

router.get('/publisherscount', async(req, res) => {  
    const tableContent = await appService.countPublishersWithGamestable();
    res.json({data:tableContent});
});

router.get("/current-user", async (req, res) => {
    const { email } = req.query;
    const user = await appService.currentUser(email);
    res.json({data:user});
});

router.get("/popular-game", async (req, res) => {
    const user = await appService.getTitleGameForAllPlayers();
    res.json({data:user});
});

router.get("/everyone-game", async (req, res) => {
    try {
        const { genreRating } = req.query;
        if (genreRating === 'T' || genreRating === 'A' || genreRating === 'E') {
            const user = await appService.getGameRatedEforEveryone(genreRating);
            return res.json({ data: user });
        }
        return res.status(400).json({ error: 'missing parameter' });
        
    } catch (error) {
        console.error('Error in /everyone-game route:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get("/all-users", async (req, res) => {
    const user = await appService.getAllUser()
    res.json({data:user});
});

// POST REQUESTS 
router.post("/insert-new-user", async (req, res) => {
    const { email, dob } = req.body;
    const insertResult = await appService.insertNewUser(email, dob);
    if (insertResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

router.post("/update-user-bio", async (req, res) => {
    const { newBio, email } = req.body;
    const updateResult = await appService.updateUser(newBio, email);
    if (updateResult) {
        res.json({ success: updateResult});
    } else {
        res.status(500).json({ success: false });
    }
});

router.post("/update-user-avatar", async (req, res) => {
    const { avatar, email } = req.body;
    const updateResult = await appService.updateUserAvatar(avatar, email);
    if (updateResult) {
        res.json({ success: updateResult});
     } else {
        res.status(500).json({ success: false });
    }
});

router.post("/insert-new-game", async (req, res) => {
    const { gameID, title, genre, releaseDate, platform} = req.body;
    const insertResult = await appService.insertNewGame(gameID, title, genre, releaseDate, platform);
    if (insertResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

// DELTE REQUESTS 

router.delete("/delete-game", async (req, res) => {
    const { idForDelete } = req.query;
    const deleteResult = await appService.deleteGame(idForDelete);
    if (deleteResult !== 0) {
        res.json({ success: true });
    } else {
        console.log("FALIURE");
        res.status(500).json({ success: false });
    }
});



module.exports = router;