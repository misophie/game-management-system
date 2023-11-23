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
-- Total participation, 1-1 relationship with Leaderboard
create table Game (
    gameID int primary key,
    title varchar (50) not null,
    genre varchar (20),
    ageRestriction varchar (20),
    releaseDate date,
    platform varchar (20)
);

-- ISA Game
create table SinglePlayerGame (
    gameID int primary key,
    difficulty int,
    foreign key (gameID) references Game ON DELETE SET NULL
);

-- ISA Game
create table MultiplayerGame (
    gameID int primary key,
    serverRegion varchar (20),
    voiceChatProvider varchar (20),
    foreign key (gameID) references Game ON DELETE SET NULL
);

create table Leaderboard (
    leaderboardID int primary key,
    visibility number (1, 0),
    timeFrame varchar (50),
    gameID int unique,
    foreign key (gameID) references Game ON DELETE CASCADE
);

create table DeveloperCompany (
    companyID int primary key,
    companyName varchar (20),
    hqCity varchar (20)
);

create table Publisher (
    publisherID int primary key,
    publisherName varchar (20)
);

-- maybe use varbinary (max) to store binary data of image file, for now just use char to represent file path
create table PlayerProfile (
    profileID int primary key,
    avatar varchar (50),
    bio varchar (50)
);

create table Player (
    playerEmail varchar (30) primary key,
    dateOfBirth date,
    profileID int not null,
    rank int,
    unique (profileID),
    foreign key (profileID) references PlayerProfile
);

create table Statistic (
    playerEmail varchar (30),
    rank int,
    score int,
    primary key (playerEmail, rank),
    foreign key (playerEmail) references Player ON DELETE CASCADE
);


create table Team (
    teamID int primary key,
    creationDate date
);

-- RELATIONSHIPS
create table workFor (
    companyID int,
    publisherID int,
    primary key (companyID, publisherID),
    foreign key (companyID) references DeveloperCompany,
    foreign key (publisherID) references Publisher
);

create table develops (
    companyID int not null,
    gameID int,
    primary key (companyID, gameID),
    foreign key (companyID) references DeveloperCompany,
    foreign key (gameID) references Game
);

create table publishes (
    publisherID int not null,
    gameID int,
    primary key (publisherID, gameID),
    foreign key (publisherID) references Publisher,
    foreign key (gameID) references Game
);

create table contains (
    leaderboardID int,
    playerEmail varchar (30),
    rank int,
    primary key (leaderboardID, playerEmail, rank),
    foreign key (leaderboardID) references Leaderboard,
    foreign key (playerEmail, rank) references Statistic
);

create table hasGameTeam (
    gameID int,
    teamID int,
    primary key (gameID, teamID),
    foreign key (gameID) references MultiplayerGame,
    foreign key (teamID) references Team
);

create table isOn (
    playerEmail varchar (30),
    teamID int,
    primary key (playerEmail, teamID),
    foreign key (playerEmail) references Player,
    foreign key (teamID) references Team
);

create table plays (
    username varchar (20) not null,
    pword varchar (20) not null,
    gameID int,
    playerEmail varchar (30),
    unique (username),
    primary key (playerEmail, gameID),
    foreign key (gameID) references Game,
    foreign key (playerEmail) references Player
);

create table friend (
    player1ID int,
    player2ID int,
    primary key (player1ID, player2ID),
    foreign key (player1ID) references PlayerProfile,
    foreign key (player2ID) references PlayerProfile
);

-- Insert tuples into tables
insert into Game values (1, 'Maple Story', 'RPG', 'E', TO_DATE ('10-OCT-2023', 'DD-MM-YYYY'), 'iOS');
insert into Game values (2, 'League of Legends', 'MOBA', 'PG13', TO_DATE ('10-OCT-2023', 'DD-MM-YYYY'), 'Microsoft Windows');
insert into Game values (3, 'Valorant', 'Shooter', 'PG13', TO_DATE ('10-OCT-2023', 'DD-MM-YYYY'), 'Microsoft Windows');
insert into Game values (4, 'TeamFight Tactics', 'Auto Chess', 'E', TO_DATE ('10-OCT-2023', 'DD-MM-YYYY'), 'Microsoft Windows');
insert into Game values (5, 'Genshin Impact', 'Action RPG', 'PG13', TO_DATE ('10-OCT-2023', 'DD-MM-YYYY'), 'Microsoft Windows');
insert into Game values (6, 'The Witcher 3: Wild Hunt', 'RPG', 'PG13', TO_DATE ('10-OCT-2023', 'DD-MM-YYYY'), 'PC');
insert into Game values (7, 'Assassins Creed Valhalla', 'Action-Adventure', 'R', TO_DATE ('10-OCT-2023', 'DD-MM-YYYY'), 'Xbox');
insert into Game values (8, 'The Legend of Zelda: Breath of the Wild', 'Action-Adventure', 'PG13', TO_DATE ('10-OCT-2023', 'DD-MM-YYYY'), 'Nintendo Switch');
insert into Game values (9, 'Cyberpunk 2077', 'RPG', 'R', TO_DATE ('10-OCT-2023', 'DD-MM-YYYY'), 'PC');
insert into Game values (10, 'Red Dead Redemption 2', 'Action-Adventure', 'R', TO_DATE ('10-OCT-2023', 'DD-MM-YYYY'), 'PlayStation');


insert into SinglePlayerGame values (6,  6);
insert into SinglePlayerGame values (7,  8);
insert into SinglePlayerGame values (8, 10);
insert into SinglePlayerGame values (9, 9);
insert into SinglePlayerGame values (10, 3);


insert into MultiplayerGame values (1, 'America-1001', 'Voices');
insert into MultiplayerGame values (2, 'America-1002', 'VoicePro');
insert into MultiplayerGame values (3, 'America-1003', 'TeamSpeak');
insert into MultiplayerGame values (4, 'America-1006', 'Noise');
insert into MultiplayerGame values (5, 'America-1005',  'Mumble');


insert into Leaderboard values (1, 1, '2023-10-12 - 2023-10-19', 1);
insert into Leaderboard values (2, 1, '2023-10-12 - 2023-10-19', 2);
insert into Leaderboard values (3, 1, '2023-10-12 - 2023-10-19', 3);
insert into Leaderboard values (4, 0, '2023-10-12 - 2023-10-19', 4);
insert into Leaderboard values (5, 1, '2023-10-12 - 2023-10-19', 5);
insert into Leaderboard values (6, 1, '2023-10-12 - 2023-10-19', 6);
insert into Leaderboard values (7, 1, '2023-10-12 - 2023-10-19', 7);
insert into Leaderboard values (8, 1, '2023-10-12 - 2023-10-19', 8);
insert into Leaderboard values (9, 0, '2023-10-12 - 2023-10-19', 9);
insert into Leaderboard values (10, 1, '2023-10-12 - 2023-10-19', 10);


insert into DeveloperCompany values (1, 'Awesome Games', 'Calgary');
insert into DeveloperCompany values (2, 'Cool Games', 'Vancouver');
insert into DeveloperCompany values (3, 'Machine Games', 'Toronto');
insert into DeveloperCompany values (4, 'Riot', 'LA');
insert into DeveloperCompany values (5, 'Blizzard', 'NYC');


insert into Publisher values (1, 'Ink Splatter Press');
insert into Publisher values (2, 'Game Publishers');
insert into Publisher values (3, 'Wonderful Whimsy');
insert into Publisher values (4, 'Reach for the Stars');
insert into Publisher values (5, 'Midnight Flourish');


insert into PlayerProfile values (1, '/path/to/avatar1.jpg', 'Gamer, explorer, and thrill-seeker.');
insert into PlayerProfile values (2, '/path/to/avatar2.jpg', 'Casual gamer');
insert into PlayerProfile values (3, '/path/to/avatar3.jpg', 'competitive.');
insert into PlayerProfile values (4, '/path/to/avatar4.jpg', 'live laugh love.');
insert into PlayerProfile values (5, '/path/to/avatar5.jpg', 'i will win');


insert into Player values ('grace@gmail.com', TO_DATE ('10-OCT-2002', 'DD-MM-YYYY'), 1, 1);
insert into Player values ('sophie@gmail.com', TO_DATE ('23-OCT-2002', 'DD-MM-YYYY'), 2, 2);
insert into Player values ('audrey@gmail.com', TO_DATE ('20-NOV-2003', 'DD-MM-YYYY'), 3, 3);
insert into Player values ('jane@gmail.com', TO_DATE ('30-APR-2003', 'DD-MM-YYYY'), 4, 4);
insert into Player values ('sam@gmail.com', TO_DATE ('10-MAY-2003', 'DD-MM-YYYY'), 5, 5);


insert into Statistic values ('grace@gmail.com', 200, 49988);
insert into Statistic values ('audrey@gmail.com', 1, 8000878);
insert into Statistic values ('jane@gmail.com', 20, 4482748);
insert into Statistic values ('sam@gmail.com', 9000, 434);


insert into Team values (1, TO_DATE ('10-MAY-2003', 'DD-MM-YYYY'));
insert into Team values (2, TO_DATE ('7-JUN-2018', 'DD-MM-YYYY'));
insert into Team values (3, TO_DATE ('14-JAN-2021', 'DD-MM-YYYY'));
insert into Team values (4, TO_DATE ('13-DEC-2022', 'DD-MM-YYYY'));
insert into Team values (5, TO_DATE ('10-MAY-2013', 'DD-MM-YYYY'));


insert into workFor values (1, 1);
insert into workFor values (1, 2);
insert into workFor values (2, 1);
insert into workFor values (2, 2);
insert into workFor values (2, 3);


insert into develops values (1, 1);
insert into develops values (2, 2);
insert into develops values (3, 3);
insert into develops values (4, 4);
insert into develops values (5, 5);


insert into publishes values (1, 1);
insert into publishes values (2, 2);
insert into publishes values (3, 3);
insert into publishes values (4, 4);
insert into publishes values (5, 5);


insert into contains values (1, 'grace@gmail.com', 200);
insert into contains values (2, 'sophie@gmail.com', 7);
insert into contains values (3, 'audrey@gmail.com', 1);
insert into contains values (4, 'jane@gmail.com', 20);
insert into contains values (5, 'sam@gmail.com', 9000);


insert into hasGameTeam values (1, 1);
insert into hasGameTeam values (1, 2);
insert into hasGameTeam values (1, 3);
insert into hasGameTeam values (1, 4);
insert into hasGameTeam values (1, 5);


insert into isOn values ('grace@gmail.com', 1);
insert into isOn values ('sophie@gmail.com', 1);
insert into isOn values ('audrey@gmail.com', 1);
insert into isOn values ('jane@gmail.com', 1);
insert into isOn values ('sam@gmail.com', 1);


insert into plays values ('aud', '12345667', 1, 'audrey@gmail.com');
insert into plays values ('zhanginc', '1667', 1, 'grace@gmail.com');
insert into plays values ('soneif', '1278797779', 1, 'sophie@gmail.com');
insert into plays values ('jan', 'hello1', 1, 'jane@gmail.com');
insert into plays values ('sam2', 'goodbye3', 1, 'sam@gmail.com');


insert into friend values (1, 2);
insert into friend values (2, 3);
insert into friend values (3, 4);
insert into friend values (4, 5);
insert into friend values (5, 3);
