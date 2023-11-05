import React from "react";
import styled from "styled-components";
import DummyImage from "../images/300.png";
import { LeaderboardComponent } from "../components/LeaderboardComponent";

const GameContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #f0f0f0;
  min-height: 100vh; 
  width: 100%;
  justify-content: center; 
  gap: 10%;
  padding-top: 10%;
`;

const AvatarLeaderboardContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10%;
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
    font-size: 16px;
    color: #333;
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
    return(
        <GameContainer>
            <AvatarLeaderboardContainer>
            <PlayerAvatar src={DummyImage} alt="this is a dog" />
            <LeaderboardComponent title={"Leaderboard"}/>
            </AvatarLeaderboardContainer>

            <GameDescription>
                <Text>
                Developer Company:
                </Text>
                <Text>
                Publisher:
                </Text>
                <Text>
                Type:
                </Text>
                <Text>
                Genre:
                </Text>
                <Text>
                Release Date:
                </Text>
                <PlayButton>Play</PlayButton>
            </GameDescription>

        </GameContainer>

    )
}