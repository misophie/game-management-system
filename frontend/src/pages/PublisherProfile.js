import React from "react";
import styled from "styled-components";
import DummyImage from "../images/300.png";

const PublisherContainer = styled.div`
    display: flex;
    flex-direction: row;
    background-color: #f0f0f0;    
    min-height: 100vh;
    width: 100%;
    justify-content: center;
    gap: 10%;
    padding-top: 10%;
`;

const PublisherDescription = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 50%;
    gap: 10%
`;

const PublisherImage = styled.div`
    width: 300px;
    height: 300px;
`;

const Text = styled.text`
    font-size: 16px;
    color: #333;
    font-weight: bold;
`;

export const PublisherProfile = () => {
    return(
        <PublisherContainer>
            <PublisherImage scr = {DummyImage} alt = "our company's logo" />
            <PublisherDescription>
                <Text>
                Name: xxx
                </Text>
                <Text>
                Headquarter City: xxx 
                </Text>
            </PublisherDescription>
        </PublisherContainer>
    )
}
