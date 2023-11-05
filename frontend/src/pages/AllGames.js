import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import DummyImage from "../images/300.png";

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
const GameTitle = ({title, img, gameType = false}) => {
    return(
        <Link to={gameType ? "/multi-player-game" : "/single-player-game"}>
          <GameImageContainer>
            <GameImage src={DummyImage} alt="this is a dog" />
            <Title>{title}</Title>
        </GameImageContainer>
        </Link>
    )
}

export const AllGames = () => {
    return(
    <PageContainer>
            <AllGameContainer>
            <GameTitle title={"Genshin Impact"} gameType={true}/>
            <GameTitle title={"Maple Story"}/>
            <GameTitle title={"Genshin Impact"} gameType={true}/>
            <GameTitle title={"Genshin Impact"} gameType={true}/>
            <GameTitle title={"Genshin Impact"} gameType={true}/>
            <GameTitle title={"Genshin Impact"} gameType={true}/>
            <GameTitle title={"Genshin Impact"} gameType={true}/>
            <GameTitle title={"Genshin Impact"} gameType={true}/>
            <GameTitle title={"Genshin Impact"} gameType={true}/>
            <GameTitle title={"Genshin Impact"} gameType={true}/>
            <GameTitle title={"Genshin Impact"} gameType={true}/>        
        </AllGameContainer>
    </PageContainer>
        
    )
}