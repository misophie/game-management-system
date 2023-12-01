import React, { useState } from 'react';
import styled from 'styled-components';

const PageButton = styled.button`
  background-color: #007bff;
  color: white; 
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 50%;
`
const PageInput = styled.input`
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
`

const Container = styled.div`
    display: flex;
    gap: 20px;
`

const Text = styled.text`
    font-size: 16px;
    color: #333;
    font-weight: bold;
`



export const EditableText = ({ text, isEditable, onEdit, onSave }) => {
  const [editedText, setEditedText] = useState(text);

  const handleBlur = () => {
    onSave(editedText);
  };

  const handleChange = (e) => {
    setEditedText(e.target.value);
  };

  return (
    <Container>
      {isEditable ? (
        <PageInput
          type="text"
          value={editedText}
          onChange={handleChange}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <Text>{text}</Text>
      )}
      {isEditable && <PageButton onClick={onEdit}>Save</PageButton>}
    </Container>
  );
};

