
// i need an insert for what table the user is requesting
// after getting the table, i want to be able to view all the attributes that might come with this table 
// afer that, i need for some way to show case that to the user as the available options, and they should be able to select any number of these attributes 
// we have to make multiple axios calls (1) call to get the table, and after that (2) another call

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Dropdown } from './DropdownComponent';
import { ColumnTable } from './ColumnTable';

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 8px;
  align-items:center;
`;

const Heading = styled.h1`
  text-align: center;
  color: #333;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const DropdownContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

// Main App Component
export const Projection = () => {
  const [tables, setTables] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [selectedTable, setSelectedTable] = useState('game');
  const [queryAttributes, setQueryAttributes] = useState([]);
  const [query, setQuery] = useState([]);

  // Fetch table names when the component mounts
  useEffect(() => {
    axios.get('http://localhost:55001/tables')
      .then(response => setTables(response.data.data))
      .catch(error => console.error('Error fetching tables:', error));
  }, []);


  // Fetch table names when the component mounts
  useEffect(() => {
    axios.get('http://localhost:55001/attributes', {params: {selectedTable: selectedTable}})
      .then(response => setAttributes(response.data.data.metaData))
      .catch(error => console.error('Error fetching tables:', error));
  }, [selectedTable]);

  useEffect(() => {
     setQueryAttributes([])
  }, [selectedTable]);


  const attributeArray = attributes.map(dictionary => dictionary.name)
  
  const addAttribute = (attributeName) => {
    setQueryAttributes(prevAttributes => [...prevAttributes, attributeName]);
  };  

  const handleClick = () => {
    const load = {
        selectedTable : selectedTable,
        queryAttributes: queryAttributes
    }
    axios.get('http://localhost:55001/projectionQuery', {params: load})
      .then(response => setQuery(response.data.data.rows))
      .catch(error => console.error('Error fetching tables:', error));
  }

  return (
    // when there is attributes then u can add to this 
    <Container>
        
      <Heading>Select a Table to Query</Heading>

      <DropdownContainer>
      <Dropdown options={tables} onSelect={setSelectedTable} projection={true}/>
      {attributeArray ? 
      <Dropdown options={attributeArray} onSelect={addAttribute} projection={true} attribute={true} /> : 
      null}
      </DropdownContainer>
      
      
      <Button onClick={handleClick}>Get Tables</Button>
      {console.log(query)}
      {query && queryAttributes ? 
      <ColumnTable titles={queryAttributes} data={query} />
      : null}

    </Container>
  );
}