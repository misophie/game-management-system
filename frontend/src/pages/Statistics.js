import React, { useState, useEffect } from "react";
import { Link, useNavigate  } from "react-router-dom";
import styled from "styled-components";
import DummyImage from "../images/300.png";
import axios from "axios";
import { Dropdown } from "../components/DropdownComponent";
import { Projection } from "../components/Projection";

const PageButton = styled.button`
  background-color: #007bff;
  color: white; 
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 50%;
`

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5%;
  align-items: center;
  min-height: 100vh;
  height: 100%;
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

const AllGamesStatistic = ({genreTitle, genreNumber}) => {
    return(
        <StatisticContainer>
            <Title>{genreTitle}</Title>
            <Title>{genreNumber}</Title>
        </StatisticContainer>

    )
}


export const Statistics = () => {
    const [genreData, setGenreData] = useState('');
    const [displayGenre, setDisplayGenre] = useState(false);

    const handleGenreQuery = () => {
        setDisplayGenre(true)

    }

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
        <PageButton onClick={handleGenreQuery}>
            Show the Number of Genres Available
        </PageButton>
        {
            displayGenre ? 
                
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
            </AllStatisticsContainer> : 
            null
        }
        <Projection />

    </PageContainer>
        
    )
}