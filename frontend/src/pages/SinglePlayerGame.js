import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import styled from "styled-components";
import DummyImage from "../images/300.png";
import { LeaderboardComponent } from "../components/LeaderboardComponent";
import axios from "axios";

const GameContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #f0f0f0;
  min-height: 100vh; 
  width: 100%;
  justify-content: center; 
  gap: 10%;
  padding-top: 5%;
`;

const AvatarLeaderboardContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5%;
`

const GameDescription = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 50%;
    gap: 10%;
`
const PlayerAvatar = styled.img`
    width: 300px;
    height: 300px;
`
const Text = styled.text`
    font-size: 24px;
    color: #333;
    font-weight: bold;
`

const Heading = styled.text`
    color: #333;
    font-size: 32px;
    text-align: center;
    font-weight: bold;
`
const PlayButton = styled.button`
  background-color: #007bff;
  color: white; 
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 50%;
`

export const SinglePlayerGame = () => {
    const location = useLocation();
    const data = location.state;

    console.log(data);

    const { title, type, date, publisher, company } = data;


    return(
        <GameContainer>
            <AvatarLeaderboardContainer>
            <Heading>
                {title}
            </Heading>
            <PlayerAvatar src={DummyImage} alt="this is a dog" />
            <LeaderboardComponent title={"Leaderboard"}/>
            </AvatarLeaderboardContainer>

            <GameDescription>
                <Text>
                Developer Company: {company}
                </Text>
                <Text>
                Publisher: {publisher}
                </Text>
                <Text>
                Genre: {type}
                </Text>
                <Text>
                Release Date: {date}
                </Text>
                <PlayButton>Play</PlayButton>
            </GameDescription>

        </GameContainer>

    )
}