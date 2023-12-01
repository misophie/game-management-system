import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

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

const Padding = styled.div`
    padding-bottom: 0.1cm
`

export const SignUp = () => {
    const [data, setData] = useState(false);
    const [dob, setDOB] = useState('')
    const [email, setEmail] = useState('');

    const handleClick = () => {
        console.log('handleClick called');
        // !! SANITIZE INPUT BEFORE POSTING OR WHEN MAKING REQUEST TO BACKEND
        // particularly, the date input
            
        // Sample data to be sent in the POST request
        // const postData = {
        //     user: "f",
        //     pword: "f"
        // }; 
    
        const userInfo =  {
            email: email,
            dob: dob
        }
  
        // Make a POST request to the backend
        axios.post('http://localhost:55001/insert-new-user', userInfo)
            .then(response => {
            // Assuming the response contains the updated data
            setData(response["data"]["success"])
            })
            .catch(error => console.error('Error fetching data:', error));
    
    }

    return(
        <PageContainer>
            <Title>Please fill out the information below:</Title>
            <InnerContainer>
                <Text>Email:</Text>
                <InputTextBox
                    type = "text"
                    id = 'user'
                    placeholder="Enter username here"
                    onChange={(e) => setEmail(e.target.value)}/>
            </InnerContainer>
            <InnerContainer>
                <Text>Date of Birth (DD-MM-YYYY):</Text>
                    <InputTextBox
                        type = "text"
                        id = 'dob'
                        placeholder="Enter birthday here"
                        onChange={(e) => setDOB(e.target.value)}/>
            </InnerContainer>
            <SignUpButton onClick={handleClick}>Sign Up</SignUpButton>
            {data ? 
            <div>
                Sucessfully signed up! Please sign in now.
            </div> : 
            <div>      
            </div>
            }
        </PageContainer>
    )
}