import React, { useState, useEffect } from "react";
import { Link, useNavigate  } from "react-router-dom";
import styled from "styled-components";
import DummyImage from "../images/300.png";
import axios from "axios";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5%;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  height: 100%;
`
const AllGameContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 20px;
    align-item: center;
`
const Title = styled.text`
    font-size: 16px;
    color: #333;
    font-weight: bold;  
`

const Heading = styled.h1`
    color: #333;
    font-weight: bold;  
`
const GameImage = styled.img`
    width: 300px;
    height: auto;
`
const GameImageContainer = styled.div`
    display: flex;
    flex-direction: column;
    cursor: pointer;
`

const AllStatisticsContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
`

const StatisticContainer = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
`
// true = multiplayer
// false = single-player game
const GameTitle = ({key, title, img, gameType = false, genre, date, publisher, company}) => {
    const navigate = useNavigate();


    const handleLinkClick = () => {
        // Pass props using the state property
        navigate(genre === "RPG" ? "/single-player-game" : "/multi-player-game", { state: {key: key, title: title, type: genre, date: date, publisher: publisher, company: company} });
    };


    return(
        <div onClick={handleLinkClick}>
          <GameImageContainer>
            <GameImage src={DummyImage} alt="this is a dog" />
            <Title>{title}</Title>
        </GameImageContainer>
        </div>
    )
}

const AllGamesStatistic = ({genreTitle, genreNumber}) => {
    return(
        <StatisticContainer>
            <Title>{genreTitle}</Title>
            <Title>{genreNumber}</Title>
        </StatisticContainer>

    )
}


export const AllGames = () => {
    const [data, setData] = useState('');
    const [genreData, setGenreData] = useState('');



    useEffect(() => {
        // Fetch data from Express backend
        axios.get('http://localhost:55001/publishers')
          .then(response => setData(response.data["data"]))
          .catch(error => console.error('Error fetching data:', error));
      }, []);

    useEffect(() => {
    // Fetch data from Express backend
    axios.get('http://localhost:55001/genre')
        .then(response => setGenreData(response.data["data"]))
        .catch(error => console.error('Error fetching data:', error));
    }, []);

    

    return(
    <PageContainer>
        <Heading>
            Statistics
        </Heading>
        <AllStatisticsContainer>
        {Array.isArray(genreData) ? (
                genreData.map(genre => (
                    <AllGamesStatistic
                        genreTitle={genre[0]}
                        genreNumber={genre[1]}
                    />

                ))
                ) : (
                <p>Loading...</p>
                )} 
        <AllGamesStatistic />
        <AllGamesStatistic />
        </AllStatisticsContainer>
        
       
            <AllGameContainer>
            {Array.isArray(data) ? (
                data.map(game => (
                    <GameTitle 
                    key={game.gameId} 
                    title={game.title} 
                    genre={game.genre} 
                    date={game.releaseDate}
                    gameType={true}
                    publisher={game.publisherName}
                    company={game.companyName}
                    />
                ))
                ) : (
                <p>Loading...</p>
                )}      
        </AllGameContainer>
    </PageContainer>
        
    )
}