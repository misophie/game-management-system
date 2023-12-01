import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 5%;
    justify-content: center;
    align-items: center;
    height: 100%  
`

const InnerContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
    overflow-x: auto;
    justify-content: center;
    padding-bottom: 0.5%
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
const SignUpButton = styled.button`
    background-color: #007bff;
    color: white; 
    font-size: 16px;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 50%
`
const Padding = styled.div`
    padding-bottom: 0.1cm
`

export const SignIn = () => {
    const [email, setEmail] = useState('');
    const [data, setData] = useState(false);

    const navigate = useNavigate();

    const redirSignUp = () => {
        navigate("/sign-up-page")
    }

    const handleClick = () => {
        // !! SANITIZE INPUT BEFORE POSTING OR WHEN MAKING REQUEST TO BACKEND
        const userInfo =  {
            email: email,
        }
  
        axios.get('http://localhost:55001/current-user', {params: userInfo})
            .then(response => {
            // Assuming the response contains the updated data
            setData(response["data"]["data"].length >= 1)
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    return(
        <PageContainer>
            <Title>Please sign into your account or sign up if you don't already have one.</Title>
            <InnerContainer>
                <Text>Email:</Text>
                <InputTextBox
                    type = "text"
                    placeholder="Enter text here"
                    onChange={(e) => setEmail(e.target.value)}/>
            </InnerContainer>
            {
                data ? 
                <div>
                Successfully signed in! 
                </div> : 
                <div>
                </div>
            }
        
            <SignInButton onClick={handleClick}>Sign In</SignInButton>
            <Padding></Padding>
            <Text>Never logged in before?</Text>
            <Padding></Padding>
            <SignUpButton onClick={redirSignUp}>Sign up instead</SignUpButton>
        </PageContainer>
    )
}