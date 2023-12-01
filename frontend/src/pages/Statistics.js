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
  width: 300px;
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

const LeftAlignedContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 800px; 
  margin: 0 auto; 
  padding: 20px;
  text-align: left; 
  gap: 30px;
`;

const Info = styled.div`
  display: ${props => (props.isVisible ? 'flex' : 'none')};
  gap: 20px;
`;

const InfoGenreStatistic = styled.div`
  display: ${props => (props.isVisible ? 'flex' : 'none')};
  gap: 20px;
`;

const InfoGenreNested = styled.div`
  display: ${props => (props.isVisible ? 'flex' : 'none')};
  gap: 20px;
`;



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
    const [nestedData, setNestedData] = useState([]);
    const [havingData, setHavingData] = useState([]);
    const [isInfoVisible, setIsInfoVisible] = useState(true);
    const [isInfoVisibleStatistic, setisInfoVisibleStatistic] = useState(true);
    const [isInfoVisibleAggregated, setisInfoVisibleAggregated] = useState(true);


    const handleGenreQuery = () => {
        axios.get('http://localhost:55001/genre')
        .then(response => setGenreData(response.data["data"]))
        .catch(error => console.error('Error fetching data:', error));
        setIsInfoVisible(!isInfoVisible);
    }

    const handleAggregationQuery = () => {
        // Fetch data from Express backend
    axios.get('http://localhost:55001/nestedQuery')
    .then(response => setNestedData(response.data["data"]))
    .catch(error => console.error('Error fetching data:', error))
    setisInfoVisibleAggregated(!isInfoVisibleAggregated)

    }

    const handleGenreStatisticQuery = () => {
        // Fetch data from Express backend
    axios.get('http://localhost:55001/genre-difficulty')
    .then(response => setHavingData(response.data["data"]))
    .catch(error => console.error('Error fetching data:', error))
    setisInfoVisibleStatistic(!isInfoVisibleStatistic)

    }

    console.log(genreData);
    return(
    <PageContainer>
        {console.log(setNestedData)}

        <Heading>
            Statistics
        </Heading>

        <LeftAlignedContainer>
        <AllStatisticsContainer>
            <PageButton onClick={handleAggregationQuery}>
            Highest average single player game difficulty for all Genres
            </PageButton>
            <InfoGenreNested isVisible={isInfoVisibleAggregated}>
            { nestedData ? nestedData : null}
            </InfoGenreNested>
            
            </AllStatisticsContainer> 
       
            <AllStatisticsContainer>
            <PageButton onClick={handleGenreStatisticQuery}>
            Average genre difficulty for single player games
            </PageButton>

            <InfoGenreStatistic isVisible={isInfoVisibleStatistic}>
            {Array.isArray(havingData) ? (
                    havingData.map(genre => (
                        <AllGamesStatistic
                            genreTitle={genre[0]}
                            genreNumber={genre[1]}
                        />
    
                    ))
                    ) : (
                    <p>Loading...</p>
                    )} 
            </InfoGenreStatistic>
            

            </AllStatisticsContainer> 

            <AllStatisticsContainer>

            <PageButton onClick={handleGenreQuery}>
            Show the number of genres available 
            </PageButton>

            <Info isVisible={isInfoVisible}>
            {Array.isArray(genreData) ? (
                    genreData.map(genre => (
                        <AllGamesStatistic
                            genreTitle={genre[0]}
                            genreNumber={genre[1]}
                        />
    
                    ))
            ) : null} 

            </Info>
            

            </AllStatisticsContainer> 
        </LeftAlignedContainer>
    </PageContainer>
        
    )
}