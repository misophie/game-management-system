-- Drop existing tables 

drop table Leaderboard;
drop table DeveloperCompany;
drop table Publisher;
drop table Game;
drop table SinglePlayerGame;
drop table MultiplayerGame;
drop table Player;
drop table Statistic;
drop table PlayerProfile;
drop table Team;
drop table workFor;
drop table develops;
drop table publishes;
drop table contains;
drop table hasGameTeam;
drop table isOn;
drop table plays;

-- Create tables 

-- ENTITIES
create table Leaderboard(
    leaderboardID int,
    visibility bit,
    timeFrame varchar (20),
    gameID int not null,
    unique (gameID),
    primary key (leaderboardID)
    foreign key (gameID) references Game
);

create table DeveloperCompany(
    companyID int, 
    companyName varchar (20), 
    hqCity varchar (20),
    primary key (companyID)
);

create table Publisher(
    publisherID int, 
    publisherName varchar (20),
    primary key (publisherID)
);

-- Total participation, 1-1 relationship with Leaderboard
create table Game(
    gameID int, 
    title varchar (20) not null, 
    genre varchar (20), 
    ageRestriction varchar (20), 
    releaseDate date, 
    platform varchar (20),
    leaderboardID int not null, 
    unique (leaderboardID),
    primary key (gameID),
    foreign key (leaderboardID) references Leaderboard
);

-- ISA Game
create table SinglePlayerGame(
    gameID int,
    difficulty int, 
    primary key (singlePlayerGameID),
    foreign key (singlePlayerGameID) references Game
);

-- ISA Game 
create table MultiplayerGame(
    multiplayerGameID int, 
    serverRegion varchar (20), 
    voiceChatProvider varchar (20),
    primary key (multiplayerGameID),
    foreign key (multiplayerGameID) references Game
);

create table Player(
    playerEmail varchar (20),
    dateOfBirth date,
    profileID int, 
    rank int, 
    unique (profileID),
    primary key (playerEmail),
    foreign key (profileID) references PlayerProfile
);

create table Statistic(
    playerEmail varchar (20),
    rank int, 
    score int, 
    primary key (playerEmail, rank),
    foreign key (playerEmail) references Player ON DELETE CASCADE
);

-- maybe use varbinary (max) to store binary data of image file 
create table PlayerProfile(
    profileID int,
    friendProfileID int, 
    avatar varbinary (max), 
    bio varchar (20),
    playerEmail varchar (20),
    unique playerEmail,
    primary key (profileID),
    foreign key (playerEmail) references Player ON DELETE CASCADE, 
    foreign key (friendProfileID) references PlayerProfile
);

create table Team(
    teamID int,
    creationDate date,
    primary key (teamID)
);

-- RELATIONSHIPS
create table workFor(
    companyID int, 
    publisherID int, 
    primary key (companyID, publisherID)
    foreign key (companyID) references DeveloperCompany,
    foreign key (publisherID) references Publisher
);

create table develops(
    companyID int, 
    gameID int, 
    primary key (companyID, gameID),
    foreign key (companyID) references DeveloperCompany,
    foreign key (gameID) references Game
);

create table publishes(
    publisherID int, 
    gameID int,
    primary key (publisherID, gameID),
    foreign key (publisherID) references Publisher,
    foreign key (gameID) references Game
);

create table contains(
    leaderboardID int, 
    playerEmail varchar (20),
    rank int,
    primary key (leaderboardID, playerEmail, rank),
    foreign key (leaderboardID) references Leaderboard,
    foreign key (playerEmail, rank) references Statistic
);

create table hasGameTeam(
    multiplayerGameID int, 
    teamID int,
    primary key (multiplayerGameID, teamID),
    foreign key (multiplayerGameID) references MultiplayerGame,
    foreign key (teamID) references Team
);

create table isOn(
    playerEmail varchar (20),
    teamID int, 
    primary key (playerEmail, teamID),
    foreign key (playerEmail) references Player,
    foreign key (teamID) references Team
);

create table plays(
    username varchar (20) not null,
    password varchar (20) not null, 
    gameID int, 
    playerEmail varchar (20), 
    unique (username),
    primary key (playerEmail, gameID),
    foreign key (gameID) references Game,
    foreign key (playerEmail) references Player
);

create table friend(
    profileID int, 
    friendProfileID int, 
    primary key (profileID, friendProfileID),
    foreign key (profileID) references PlayerProfile,
    foreign key (friendProfileID) references PlayerProfile
);
