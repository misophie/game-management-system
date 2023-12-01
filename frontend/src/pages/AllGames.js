import React, { useState, useEffect } from "react";
import { useNavigate  } from "react-router-dom";
import styled from "styled-components";
import DummyImage from "../images/300.png";
import axios from "axios";
import { Dropdown } from "../components/DropdownComponent";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5%;
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
const GameImage = styled.img`
    width: 300px;
    height: auto;
`
const GameImageContainer = styled.div`
    display: flex;
    flex-direction: column;
    cursor: pointer;
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


export const AllGames = () => {
    const [data, setData] = useState('');
    const [selectedOption, setSelectedOption] = useState('');

    const dropdownOptions = [
        { value: 1, label: 'Adventure RPG' },
        { value: 2, label: 'Action RPG' },
        { value: 3, label: 'Strategy' },
        { value: 4, label: 'MOBA' },
        { value: 5, label: 'FPS Shooter' },
      ];
      

    useEffect(() => {
        // Fetch data from Express backend
        axios.get('http://localhost:55001/publishers', {params: {selectedOption: selectedOption}})
          .then(response => setData(response.data["data"]))
          .catch(error => console.error('Error fetching data:', error));
      }, [selectedOption]);

    
    return(
    <PageContainer>
        <Dropdown options={dropdownOptions} onSelect={setSelectedOption}/>
       
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