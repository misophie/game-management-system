import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    justify-content: center;
    align-items: center;
    padding-bottom: 20px;
`

const InnerContainer = styled.div`
    display: flex;
    max-width: 800px; 
    margin: 0 auto; 
    padding: 5px;
    text-align: right; 
    gap: 30px;
    align-items: right;
`

const Title = styled.text`
    font-size: 20px;
    color: #333;
    font-weight: bold;
    padding-bottom: 0.5%
`

const Text = styled.text`
    font.size: 16px;
    color: #333;
    font-weight: bold
`

const InputTextBox = styled.input`
    width = 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none
`

const SignInButton = styled.button`
    background-color: #007bff;
    color: white; 
    font-size: 16px;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 50%
`

export const AddGameTuple = () => {
    const [gameID, setGameID] = useState('')
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [platform, setPlatform] = useState('');
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(false);
    

    const handleClick = () => {
        // !! SANITIZE INPUT BEFORE POSTING OR WHEN MAKING REQUEST TO BACKEND
        // this is for adding the game tuple 
        const gameInfo = {
            gameID: gameID,
            title: title,
            genre: genre,
            releaseDate: releaseDate,
            platform: platform,
        }

        console.log(gameInfo)

  
        axios.post('http://localhost:55001/insert-new-game', gameInfo)
            .then(response => {
                  setSuccess(response)
                  console.log(response)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError(true);
            });
    }


    return(
        <PageContainer>
            <Title>Please fill out the information below to Add Your Desired Game: </Title>
            <InnerContainer>
                <Text>Game ID:</Text>
                <InputTextBox
                    type = "text"
                    placeholder="Enter text here"
                    onChange={(e) => setGameID(e.target.value)}/>
            </InnerContainer>
            <InnerContainer>
                <Text>Title:</Text>
                <InputTextBox
                    type = "text"
                    placeholder="Enter text here"
                    onChange={(e) => setTitle(e.target.value)}/>
            </InnerContainer>
            <InnerContainer>
                <Text>Genre:</Text>
                <InputTextBox
                    type = "text"
                    placeholder="Enter text here"
                    onChange={(e) => setGenre(e.target.value)}/>
            </InnerContainer>
            <InnerContainer>
                <Text>Release Date:</Text>
                <InputTextBox
                    type = "text"
                    placeholder="Enter text here"
                    onChange={(e) => setReleaseDate(e.target.value)}/>
            </InnerContainer>
            <InnerContainer>
                <Text>Platform:</Text>
                <InputTextBox
                    type = "text"
                    placeholder="Enter text here"
                    onChange={(e) => setPlatform(e.target.value)}/>
            </InnerContainer>

            <SignInButton onClick={handleClick}>Add Game</SignInButton>
            {console.log(success)}
            {console.log("producing the error")}
            {console.log(error)}

            { success === null ? (error ? "Failure. Duplicate Game ID or incorrect date formation." : null) : (success ? "Success. Check the tuple in Query Available Game Tables." : "Failure. Duplicate Game ID or incorrect date formation.") }
        </PageContainer>
    )
}
