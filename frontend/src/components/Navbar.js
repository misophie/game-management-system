import React from "react";
import styled from 'styled-components';

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
`;

const NavItem = styled.a`
  text-decoration: none;
  color: inherit;
  font-weight: bold;
  padding: 10px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;

const AppName = styled.h1`
  margin: 0;
  font-size: 24px;
`;

export const NavigationBar = () => {
  return (
    <NavBar>
      <NavItem href="/games">Games</NavItem>
      <AppName>Game Platform Manager</AppName>
      <NavItem href="/">Player Profile</NavItem>
    </NavBar>
  );
};