import React from "react";
import { Routes, Route } from 'react-router-dom';
import { SinglePlayerGame } from "./pages/SinglePlayerGame";
import { PlayerProfile } from "./pages/PlayerProfile";
import { AllGames } from "./pages/AllGames";
import { NavigationBar } from "./components/Navbar";
import { MultiplayerGame } from "./pages/MultiplayerGame";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Statistics } from "./pages/Statistics";
import { ProjectionPage } from "./pages/ProjectionPage";

function App() {
  return (
    <div>
      <NavigationBar />
      <Routes>
          <Route path="/player-profile" element={<PlayerProfile />} />
          <Route path="/games" element={<AllGames />} />
          <Route path="/single-player-game" element={<SinglePlayerGame />} />
          <Route path="/multi-player-game" element={<MultiplayerGame/>} />
          <Route path="/" element={<SignIn />} />
          <Route path="/sign-up-page" element={<SignUp />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/projection" element={<ProjectionPage />} />
      </Routes>
    </div>
  );
}

export default App;
