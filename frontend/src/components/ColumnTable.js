import React from 'react';
import styled from 'styled-components';

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

const Th = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
`;

export const ColumnTable = ({ titles, data }) => (
  <Table>
    <thead>
      <tr>
        {titles.map((title, index) => (
          <Th key={index}>{title}</Th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((row, rowIndex) => (
        <tr key={rowIndex}>
          {row.map((cell, cellIndex) => (
            <Td key={cellIndex}>{cell}</Td>
          ))}
        </tr>
      ))}
    </tbody>
  </Table>
);