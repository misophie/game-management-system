import React, { useState } from 'react';
import styled from 'styled-components';

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  
`;

const DropdownToggle = styled.div`
  cursor: pointer;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 300px;
  text-align: center;
`;

const DropdownOptions = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 300px;
  text-align: center;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`;

const DropdownOption = styled.li`
  padding: 8px;
  cursor: pointer;
  

  &:hover {
    background-color: #f2f2f2;
  }
`;

export const Dropdown = ({ options, onSelect, projection = false, attribute = false}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(projection ? (attribute ? option : option[0]) : option.label);
  }; 



  return (
    <DropdownContainer>
      <DropdownToggle onClick={toggleDropdown}>
        {selectedOption ? (projection ? (attribute ? selectedOption : selectedOption[0]) : selectedOption.label)  : 'Select an option'}
      </DropdownToggle>
      <DropdownOptions isOpen={isOpen}>
        {options ? options.map((option) => (
          <DropdownOption key={option.value} onClick={() => handleOptionClick(option)}>
            {projection ? (attribute ? option : option[0]) : option.label}
          </DropdownOption>
        )) : null}
      </DropdownOptions>
    </DropdownContainer>
  );
};