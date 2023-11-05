import React from "react";
import styled from "styled-components";
import DummyImage from "../images/300.png";
import { LeaderboardComponent } from "../components/LeaderboardComponent";

const PlayerContainer = styled.div`
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

const PlayerDescription = styled.div`
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
const AllFriendContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`
const FriendContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
    max-width: 400px;
    overflow-x: auto;
`
const FriendAvatar = styled.img`
    width: 100px;
    height: 100px;
`
const AddFriendContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`
const AddFriendInput = styled.input`
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
`
const FriendButton = styled.button`
  background-color: #007bff;
  color: white; 
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 50%;
`

export const PlayerProfile = () => {
    return(
        <PlayerContainer>
            <AvatarLeaderboardContainer>
            <PlayerAvatar src={DummyImage} alt="this is a dog" />
            <LeaderboardComponent title={"All Game Ranking"} />
            </AvatarLeaderboardContainer>

            <PlayerDescription>
                <Text>
                Username: zhanginc
                </Text>
                <Text>
                Bio: I am an avid gamer love gamingI am an avid gamer
                </Text>
                <AllFriendContainer>
                <Text>
                    Friends
                </Text>
                <FriendContainer>
                    <FriendAvatar src={DummyImage} alt="this is a dog"  />
                    <FriendAvatar src={DummyImage} alt="this is a dog"  />
                    <FriendAvatar src={DummyImage} alt="this is a dog"  />
                    <FriendAvatar src={DummyImage} alt="this is a dog"  />
                </FriendContainer>
                </AllFriendContainer>
            
                <AddFriendContainer>
                <AddFriendInput 
                    type="text"
                    placeholder="Enter text here"/>
                <FriendButton>Add Friend</FriendButton>
                </AddFriendContainer>
            </PlayerDescription>

        </PlayerContainer>

    )
}