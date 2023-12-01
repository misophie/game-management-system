import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Projection } from "../components/Projection";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5%;
  align-items: center;
  min-height: 100vh;
  height: 100%;
`

export const ProjectionPage = () => {
    return(
    <PageContainer>
        <Projection />

    </PageContainer>
        
    )
}