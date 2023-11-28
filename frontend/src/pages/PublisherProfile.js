import React from "react";
import styled from "styled-components";
import DummyImage from "../images/300.png";

const DeveloperContainer = styled.div`
    display: flex;
    flex-direction: row;
    background-color: #f0f0f0;    
    min-height: 100vh;
    width: 100%;
    justify-content: center;
    gap: 10%;
    padding-top: 10%;
`;

const DeveloperDescription = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 50%;
    gap: 10%
`;

const DeveloperImage = styled.div`
    width: 300px;
    height: 300px;
`;

const Text = styled.text`
    font-size: 16px;
    color: #333;
    font-weight: bold;
`;

export const DeveloperProfile = () => {
    return(
        <DeveloperContainer>
            <DeveloperImage scr = {DummyImage} alt = "our company's logo" />
            <DeveloperDescription>
                <Text>
                Name: xxx
                </Text>
                <Text>
                Headquarter City: xxx 
                </Text>
            </DeveloperDescription>
        </DeveloperContainer>
    )
}
