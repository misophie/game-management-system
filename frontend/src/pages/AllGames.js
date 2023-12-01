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

const FilterContainer = styled.div`
    display: flex;
    gap: 30px;
    margin-bottom: 30px;
    align-items: center;

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

const Text = styled.text`
    font-size: 20px;
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
    const [queryAttributes, setQueryAttributes] = useState([]);

    const dropdownOptions = [
        { value: 1, label: 'Adventure RPG' },
        { value: 2, label: 'Action RPG' },
        { value: 3, label: 'Strategy' },
        { value: 4, label: 'MOBA' },
        { value: 5, label: 'FPS Shooter' },
      ];

    const addAttribute = (attributeName) => {
    setQueryAttributes(prevAttributes => [...prevAttributes, attributeName]);
    };  
      

    useEffect(() => {
        // Fetch data from Express backend
        axios.get('http://localhost:55001/publishers', {params: {selectedOption: queryAttributes}})
          .then(response => setData(response.data["data"]))
          .catch(error => console.error('Error fetching data:', error));
      }, [queryAttributes]);

      

    
    return(
    <PageContainer>
        <FilterContainer>
        <Dropdown options={dropdownOptions} onSelect={addAttribute}/>
        You have selected:
        {queryAttributes ? queryAttributes.map(attribute => <Text>{attribute}</Text>) : null}
        </FilterContainer>
        
       
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