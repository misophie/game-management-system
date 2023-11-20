import React from "react";
import styled from "styled-components";

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

export const SignUp = () => {
    return(
        <PageContainer>
            <Title>Sign Up</Title>
            <InnerContainer>
                <Text>Username:</Text>
                <InputTextBox
                    type = "text"
                    placeholder="Enter text here"/>
            </InnerContainer>
            <InnerContainer>
                <Text>Password:</Text>
                    <InputTextBox
                        type = "text"
                        placeholder="Enter text here"/>
            </InnerContainer>
            <SignUpButton>Sign Up</SignUpButton>
        </PageContainer>
    )
}