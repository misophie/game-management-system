
// i need an insert for what table the user is requesting
// after getting the table, i want to be able to view all the attributes that might come with this table 
// afer that, i need for some way to show case that to the user as the available options, and they should be able to select any number of these attributes 
// we have to make multiple axios calls (1) call to get the table, and after that (2) another call

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Styled Components
const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 8px;
`;

const Heading = styled.h1`
  text-align: center;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.label`
  margin-bottom: 10px;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

// Main App Component
export const Projection = () => {
  const [tables, setTables] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [selectedTable, setSelectedTable] = useState('game');

  // Fetch table names when the component mounts
  useEffect(() => {
    axios.get('http://localhost:55001/tables')
      .then(response => setTables(response.data.data))
      .catch(error => console.error('Error fetching tables:', error));
  }, []);


  // Fetch table names when the component mounts
  useEffect(() => {
    axios.get('http://localhost:55001/tableattributes', {params: {selectedTable: selectedTable}})
      .then(response => setAttributes(response.data.data.metaData))
      .catch(error => console.error('Error fetching tables:', error));
  });
  
//   attributes.map(dictionary => dictionary.name)

  const handleTableSelection = (event) => {
    setSelectedTable(event.target.value);
  };

  console.log(tables)

  

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (selectedTable) {
      // Perform further actions, e.g., fetching attributes or making a query
      console.log(`User selected table: ${selectedTable}`);
    } else {
      console.log('Please select a table.');
    }
  };

  return (
    <Container>
      <Heading>Select a Table to Query</Heading>
      <Form onSubmit={handleFormSubmit}>
        <Label>Select a table:</Label>
        <Select onChange={handleTableSelection}>
          <option value="">Select</option>
          {tables ? tables.map(table => (
            <option >{table[0]}</option>
          )) : <div>Loading..</div>}
        </Select>

        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
}