import React from "react";
import styled from "styled-components";

const TableContainer = styled.div`
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
`
const TableRow = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;

const GameColumn = styled.div`
  flex: 1;

`;

const RankColumn = styled.div`
  width: 100px; 
  text-align: right; 

`;

const Title = styled.h2`
  background-color: #007bff;
  color: white;
  padding: 10px;
  margin: 0;
  text-align: center;
`;

export const LeaderboardComponent = ({title}) => {
    return(
        <TableContainer>
        <Title>{title}</Title>
        <TableRow>
            <GameColumn>Game 1</GameColumn>
            <RankColumn>Rank 1</RankColumn>
        </TableRow>
        <TableRow>
            <GameColumn>Game 2</GameColumn>
            <RankColumn>Rank 2</RankColumn>
        </TableRow>
        <TableRow>
            <GameColumn>Game 3</GameColumn>
            <RankColumn>Rank 3</RankColumn>
        </TableRow>
         </TableContainer>
        
    )
}